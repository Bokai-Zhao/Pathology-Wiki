"""Validate every YAML in knowledge/ against its schema.

Walks knowledge/{articles,methods,models,datasets,tools,benchmarks}/
and validates each YAML against the matching schema in schemas/.
Also validates knowledge/graph/{nodes,edges}.yaml.

Exits non-zero on any failure. Always prints a summary.

Reports two consistency warnings:
  - object YAML's `related_*` hint references an id that does not exist
    as a node in graph/nodes.yaml
  - graph/edges.yaml references an `id` not in graph/nodes.yaml
"""
from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

import yaml
from jsonschema import Draft7Validator, RefResolver

from _paths import (
    EDGES_FILE,
    KNOWLEDGE,
    NODES_FILE,
    OBJECT_TYPES,
    SCHEMA_FOR_TYPE,
    SCHEMAS,
)


def load_yaml(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def load_schema(name: str) -> dict:
    return load_yaml(SCHEMAS / name)


def make_resolver() -> RefResolver:
    """Resolver so $ref to _common.schema.yaml works."""
    base_uri = SCHEMAS.resolve().as_uri() + "/"
    store: dict[str, dict] = {}
    for schema_path in SCHEMAS.glob("*.schema.yaml"):
        schema = load_yaml(schema_path)
        if "$id" in schema:
            store[schema["$id"]] = schema
        store[base_uri + schema_path.name] = schema
    return RefResolver(base_uri=base_uri, referrer={}, store=store)


def iter_object_yamls() -> list[tuple[str, Path]]:
    """Yield (object_type, path) for every YAML under knowledge/{type}/."""
    out: list[tuple[str, Path]] = []
    for obj_type, dirname in OBJECT_TYPES.items():
        root = KNOWLEDGE / dirname
        if not root.exists():
            continue
        for p in root.rglob("*.yaml"):
            out.append((obj_type, p))
    return out


def validate_one(obj_type: str, path: Path, resolver: RefResolver) -> list[str]:
    """Return a list of error messages (empty if valid)."""
    schema_name = SCHEMA_FOR_TYPE.get(obj_type)
    if schema_name is None:
        return [f"no schema mapped for type '{obj_type}'"]
    schema = load_schema(schema_name)
    try:
        data = load_yaml(path)
    except yaml.YAMLError as e:
        return [f"YAML parse error: {e}"]
    if data is None:
        return ["empty document"]
    validator = Draft7Validator(schema, resolver=resolver)
    return [f"{'.'.join(map(str, e.path)) or '<root>'}: {e.message}"
            for e in validator.iter_errors(data)]


def validate_graph_files(resolver: RefResolver) -> tuple[list[str], set[str], list[dict]]:
    """Validate nodes.yaml + edges.yaml; return (errors, node_ids, edges)."""
    errors: list[str] = []
    node_ids: set[str] = set()
    edges: list[dict] = []

    graph_schema = load_schema("graph.schema.yaml")

    if NODES_FILE.exists():
        nodes_schema = graph_schema["nodes_file"]
        nodes_data = load_yaml(NODES_FILE) or {"nodes": []}
        for e in Draft7Validator(nodes_schema, resolver=resolver).iter_errors(nodes_data):
            errors.append(f"nodes.yaml :: {'.'.join(map(str, e.path)) or '<root>'}: {e.message}")
        node_ids = {n["id"] for n in nodes_data.get("nodes", []) if "id" in n}
    else:
        errors.append("nodes.yaml does not exist")

    if EDGES_FILE.exists():
        edges_schema = graph_schema["edges_file"]
        edges_data = load_yaml(EDGES_FILE) or {"edges": []}
        for e in Draft7Validator(edges_schema, resolver=resolver).iter_errors(edges_data):
            errors.append(f"edges.yaml :: {'.'.join(map(str, e.path)) or '<root>'}: {e.message}")
        edges = edges_data.get("edges", [])
    else:
        errors.append("edges.yaml does not exist")

    return errors, node_ids, edges


def cross_check_edges(node_ids: set[str], edges: list[dict]) -> list[str]:
    warnings: list[str] = []
    for i, e in enumerate(edges):
        for end in ("from", "to"):
            v = e.get(end)
            if v and v not in node_ids:
                warnings.append(f"edge[{i}] {e.get('type','?')} {e.get('from','?')}→{e.get('to','?')}: '{end}={v}' not in nodes.yaml")
    return warnings


def cross_check_hints(objects: list[tuple[str, Path]], node_ids: set[str]) -> list[str]:
    warnings: list[str] = []
    hint_fields = [
        "related_methods", "related_models", "related_datasets",
        "related_tools", "related_benchmarks", "related_articles",
    ]
    for obj_type, path in objects:
        try:
            data = load_yaml(path) or {}
        except yaml.YAMLError:
            continue
        oid = data.get("id", path.stem)
        for field in hint_fields:
            for ref in data.get(field, []) or []:
                if ref not in node_ids:
                    warnings.append(f"{obj_type}:{oid} :: {field} hint '{ref}' not in nodes.yaml")
    return warnings


def main() -> int:
    resolver = make_resolver()
    errors: list[str] = []
    objects = iter_object_yamls()

    print(f"validating {len(objects)} object YAMLs ...")
    for obj_type, path in objects:
        errs = validate_one(obj_type, path, resolver)
        rel = path.relative_to(KNOWLEDGE.parent)
        if errs:
            errors.append(f"\n[{obj_type}] {rel}:")
            errors.extend(f"  - {e}" for e in errs)

    graph_errors, node_ids, edges = validate_graph_files(resolver)
    if graph_errors:
        errors.append("\n[graph] schema errors:")
        errors.extend(f"  - {e}" for e in graph_errors)

    edge_warnings = cross_check_edges(node_ids, edges)
    hint_warnings = cross_check_hints(objects, node_ids)

    if errors:
        print("\n".join(errors))
        print(f"\nFAIL: {sum(1 for e in errors if e.startswith('  -'))} schema error(s)")
    else:
        print("OK: all schemas pass")

    if edge_warnings:
        print("\nedge cross-check warnings:")
        for w in edge_warnings:
            print(f"  - {w}")
    if hint_warnings:
        print("\nhint cross-check warnings (object YAML's related_* points to node not in graph):")
        for w in hint_warnings:
            print(f"  - {w}")

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
