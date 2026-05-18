"""List nodes with zero edges in edges.yaml (CLAUDE.md §8.5)."""
from __future__ import annotations

import sys
from pathlib import Path

import yaml

from _paths import EDGES_FILE, NODES_FILE


def load_yaml(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def main() -> int:
    nodes = (load_yaml(NODES_FILE) or {}).get("nodes", [])
    edges = (load_yaml(EDGES_FILE) or {}).get("edges", [])
    connected: set[str] = set()
    for e in edges:
        connected.add(e["from"])
        connected.add(e["to"])
    orphans = [n for n in nodes if n["id"] not in connected]
    if not orphans:
        print("OK: no orphan nodes")
        return 0
    print(f"WARN: {len(orphans)} orphan node(s):")
    for n in orphans:
        print(f"  - {n['type']}:{n['id']}  ({n.get('label', '')})")
    return 0  # advisory, not fatal


if __name__ == "__main__":
    sys.exit(main())
