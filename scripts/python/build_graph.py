"""Build knowledge/graph/graph.json from nodes.yaml + edges.yaml.

Output schema (graph.json):
{
  "nodes": [{ id, type, label, aliases, taxonomy_path, ... }],
  "edges": [{ from, to, type, evidence?, confidence? }],
  "reverse_index": {
    "<node_id>": {
      "incoming": [{ from, type }],
      "outgoing": [{ to, type }]
    }, ...
  }
}

The reverse_index lets the website render local-graph cards without
re-walking edges.yaml client-side. CLAUDE.md §8.4: reverse links are
derived, not hand-written.
"""
from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path

import yaml

from _paths import EDGES_FILE, GRAPH_JSON, NODES_FILE


def load_yaml(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def main() -> int:
    if not NODES_FILE.exists():
        print(f"missing {NODES_FILE}", file=sys.stderr)
        return 1
    if not EDGES_FILE.exists():
        print(f"missing {EDGES_FILE}", file=sys.stderr)
        return 1

    nodes = (load_yaml(NODES_FILE) or {}).get("nodes", [])
    edges = (load_yaml(EDGES_FILE) or {}).get("edges", [])

    node_ids = {n["id"] for n in nodes}
    reverse_index: dict[str, dict[str, list[dict]]] = defaultdict(
        lambda: {"incoming": [], "outgoing": []}
    )

    dropped = 0
    for e in edges:
        if e["from"] not in node_ids or e["to"] not in node_ids:
            dropped += 1
            continue
        reverse_index[e["from"]]["outgoing"].append({"to": e["to"], "type": e["type"]})
        reverse_index[e["to"]]["incoming"].append({"from": e["from"], "type": e["type"]})

    out = {
        "nodes": nodes,
        "edges": [e for e in edges if e["from"] in node_ids and e["to"] in node_ids],
        "reverse_index": dict(reverse_index),
        "stats": {
            "n_nodes": len(nodes),
            "n_edges": len(edges) - dropped,
            "n_edges_dropped_dangling": dropped,
        },
    }

    GRAPH_JSON.parent.mkdir(parents=True, exist_ok=True)
    GRAPH_JSON.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {GRAPH_JSON}: {len(nodes)} nodes, {len(out['edges'])} edges"
          + (f", {dropped} dropped (dangling)" if dropped else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
