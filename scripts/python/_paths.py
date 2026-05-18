"""Shared path constants for data-side scripts."""
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
KNOWLEDGE = REPO_ROOT / "knowledge"
SCHEMAS = REPO_ROOT / "schemas"
GRAPH_DIR = KNOWLEDGE / "graph"
NODES_FILE = GRAPH_DIR / "nodes.yaml"
EDGES_FILE = GRAPH_DIR / "edges.yaml"
GRAPH_JSON = GRAPH_DIR / "graph.json"
TAXONOMIES = KNOWLEDGE / "taxonomies"
SRC_DATA = REPO_ROOT / "src" / "data"
CONTEXT_FILE = KNOWLEDGE / "agent_context.md"
REPORTS = REPO_ROOT / "reports"

OBJECT_TYPES = {
    "article": "articles",
    "method": "methods",
    "model": "models",
    "dataset": "datasets",
    "tool": "tools",
    "benchmark": "benchmarks",
}

SCHEMA_FOR_TYPE = {
    "article": "article.schema.yaml",
    "method": "method.schema.yaml",
    "model": "model.schema.yaml",
    "dataset": "dataset.schema.yaml",
    "tool": "tool.schema.yaml",
    "benchmark": "benchmark.schema.yaml",
    "skill": "skill.schema.yaml",
}
