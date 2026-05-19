"""Jinja macros for MkDocs Material.

Reads knowledge/{type}/{id}.yaml and knowledge/graph/graph.json directly,
returns Markdown / HTML strings rendered into pages by mkdocs-macros-plugin.

Macros: article(id), model(id), tool(id), dataset(id), method(id),
benchmark(id), skill_card(id), local_graph(id), node_link(id), graph_summary().

If an id is missing, the macro returns a visible warning admonition rather
than crashing the build — keeps preview useful while a missing reference
is being triaged (CLAUDE.md §11.6).

Links emitted by macros are relative to the current page (computed via
env.variables.page.url) so they work both under `mkdocs serve` (root URL)
and under GitHub Pages (`/Pathology-Wiki/` base URL).
"""
from __future__ import annotations

import json
import posixpath
from pathlib import Path
from typing import Any

import yaml

REPO = Path(__file__).resolve().parent
KNOWLEDGE = REPO / "knowledge"
GRAPH_JSON = KNOWLEDGE / "graph" / "graph.json"
SKILLS_DIR = REPO / "skills"

TYPE_DIRS = {
    "article": "articles",
    "clinical_article": "articles",
    "technical_article": "articles",
    "review_article": "articles",
    "benchmark_article": "articles",
    "dataset_article": "articles",
    "tool_article": "articles",
    "guideline_article": "articles",
    "perspective_article": "articles",
    "preprint": "articles",
    "model": "models",
    "tool": "tools",
    "dataset": "datasets",
    "method": "methods",
    "benchmark": "benchmarks",
}

# Article subdirectory routing (knowledge/articles/{subdir}/ and content/articles/{subdir}/).
# Maps article *type* → subdir. Used by _src_path so reviews / benchmarks / etc. link correctly.
ARTICLE_SUBDIRS = {
    "article": "technical",
    "technical_article": "technical",
    "clinical_article": "clinical",
    "review_article": "reviews",
    "benchmark_article": "benchmarks",
    "dataset_article": "datasets",
    "tool_article": "tools",
    "guideline_article": "guidelines",
    "perspective_article": "perspectives",
    "preprint": "technical",
}


# ---------- helpers ----------

def _load_yaml(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def _find_object(type_: str, id_: str) -> dict | None:
    """Search knowledge/{plural}/ recursively for {id}.yaml."""
    plural = TYPE_DIRS.get(type_, type_ + "s")
    root = KNOWLEDGE / plural
    for p in root.rglob(f"{id_}.yaml"):
        return _load_yaml(p)
    return None


def _graph() -> dict:
    if not GRAPH_JSON.exists():
        return {"nodes": [], "edges": [], "reverse_index": {}}
    with GRAPH_JSON.open("r", encoding="utf-8") as f:
        return json.load(f)


def _node_lookup() -> dict[str, dict]:
    return {n["id"]: n for n in _graph().get("nodes", [])}


def _missing(label: str, id_: str) -> str:
    return (
        f'!!! warning "{label} not found"\n'
        f'    No object with id `{id_}` in `knowledge/`. '
        f'See the [missing-reference policy](https://github.com/Bokai-Zhao/Pathology-Wiki/blob/main/CLAUDE.md#116-missing-reference-policy--always-ask-the-user).\n'
    )


def _src_path(type_: str, id_: str) -> str:
    """Source-tree path of the page for an object id, e.g. 'models/uni.md'.

    MkDocs resolves [label](href) against the source tree, so we emit
    .md links that match what's on disk under content/.
    """
    plural = TYPE_DIRS.get(type_)
    if plural is None:
        return ""
    if type_ in ARTICLE_SUBDIRS:
        return f"articles/{ARTICLE_SUBDIRS[type_]}/{id_}.md"
    return f"{plural}/{id_}.md"


# ---------- card renderers (shared) ----------

def _card_html(title: str, kind: str, meta: str, body: str = "", links: dict | None = None) -> str:
    link_html = ""
    if links:
        spans = []
        for k, v in links.items():
            if not v:
                continue
            if v in ("unknown", "not_found", "to_verify"):
                continue
            if k == "doi" and not str(v).startswith("http"):
                href = f"https://doi.org/{v}"
            elif str(v).startswith(("http", "/")):
                href = v
            else:
                continue  # opaque IDs we cannot resolve to a URL
            spans.append(f'<a href="{href}" target="_blank" rel="noreferrer">{k}</a>')
        if spans:
            link_html = '<div class="pwiki-card-links">' + " · ".join(spans) + "</div>"
    body_html = f"<div>{body}</div>" if body else ""
    return (
        f'<div class="pwiki-card" markdown>\n'
        f'<div class="pwiki-card-kind">{kind}</div>\n'
        f'<h3 class="pwiki-card-title">{title}</h3>\n'
        f'<div class="pwiki-card-meta">{meta}</div>\n'
        f'{body_html}\n'
        f'{link_html}\n'
        f'</div>\n'
    )


# ---------- public macros ----------

def define_env(env):

    def rel_md(target_src_path: str) -> str:
        """Compute a source-tree relative .md path from the current page's
        source path to target_src_path. MkDocs resolves both link and converts
        to URL at build time."""
        if not target_src_path:
            return "#"
        page = env.variables.get("page")
        # page.file.src_path is the source path relative to docs_dir, e.g.
        # 'articles/technical/uni-2024.md' or 'models/uni.md' or 'index.md'.
        src = ""
        if page is not None:
            f = getattr(page, "file", None)
            src = getattr(f, "src_path", "") if f else ""
        current_dir = posixpath.dirname(src.replace("\\", "/"))
        rel = posixpath.relpath(target_src_path, current_dir or ".")
        return rel

    def link_for(id_: str, label: str | None = None) -> str:
        by_id = _node_lookup()
        node = by_id.get(id_)
        if not node:
            return f"`{id_}`"
        text = label or node.get("label") or id_
        href = rel_md(_src_path(node["type"], id_))
        return f"[{text}]({href})"

    @env.macro
    def article(id_):
        d = _find_object("article", id_)
        if not d:
            return _missing("Article", id_)
        authors = d.get("authors") or []
        more = " et al." if len(authors) > 3 else ""
        author_str = ", ".join(authors[:3]) + more
        meta = f"{author_str} · {d.get('year','')} · {d.get('venue','')}"
        kind = f"article · {d.get('article_type', {}).get('primary', '')}"
        return _card_html(d.get("title", id_), kind, meta, links=d.get("links") or {})

    @env.macro
    def model(id_):
        d = _find_object("model", id_)
        if not d:
            return _missing("Model", id_)
        meta_parts = [
            d.get("architecture", ""),
            d.get("parameter_count", ""),
            f"weights {d.get('weights_access','?')}",
            d.get("released_by", ""),
        ]
        meta = " · ".join(p for p in meta_parts if p)
        kind = f"model · {d.get('model_family','?')}"
        return _card_html(d.get("name", id_), kind, meta, links=d.get("links") or {})

    @env.macro
    def tool(id_):
        d = _find_object("tool", id_)
        if not d:
            return _missing("Tool", id_)
        ai = d.get("agent_interface") or {}
        cap_flags = []
        if ai.get("python_api_available"): cap_flags.append("Python API")
        if ai.get("cli_available"): cap_flags.append("CLI")
        if ai.get("docker_available"): cap_flags.append("Docker")
        meta = " · ".join(filter(None, [
            ", ".join(d.get("language") or []),
            f"license {d.get('license','unknown')}",
            *cap_flags,
        ]))
        kind = f"tool · {' / '.join(d.get('tool_type') or [])}"
        body = ""
        if ai.get("install_command"):
            body = f'<pre><code>{ai["install_command"]}</code></pre>'
        return _card_html(d.get("name", id_), kind, meta, body=body, links=d.get("links") or {})

    @env.macro
    def dataset(id_):
        d = _find_object("dataset", id_)
        if not d:
            return _missing("Dataset", id_)
        scale = d.get("scale") or {}
        access = d.get("access") or {}
        bits = []
        if d.get("modalities"): bits.append(" · ".join(d["modalities"]))
        if d.get("organs"): bits.append(", ".join(d["organs"]))
        if isinstance(scale.get("n_slides"), int):
            bits.append(f"{scale['n_slides']:,} slides")
        if access.get("license"):
            bits.append(access["license"])
        meta = " · ".join(bits)
        title = d.get("full_name") or d.get("name", id_)
        links = dict(d.get("links") or {})
        if access.get("access_url"):
            links["access"] = access["access_url"]
        return _card_html(title, "dataset", meta, links=links)

    @env.macro
    def method(id_):
        d = _find_object("method", id_)
        if not d:
            return _missing("Method", id_)
        stage = ", ".join(d.get("stage") or [])
        parents = ", ".join(d.get("parent_methods") or []) or "—"
        meta = f"stage: {stage} · parents: {parents}"
        body = f"<p>{d.get('core_idea','')}</p>" if d.get("core_idea") else ""
        return _card_html(d.get("name", id_), "method", meta, body=body)

    @env.macro
    def benchmark(id_):
        d = _find_object("benchmark", id_)
        if not d:
            return _missing("Benchmark", id_)
        meta_parts = [
            f"datasets: {', '.join(d.get('datasets') or []) or '—'}",
            f"tasks: {', '.join(d.get('tasks') or []) or '—'}",
        ]
        meta = " · ".join(meta_parts)
        kind = f"benchmark · {d.get('benchmark_type','?')}"
        body = f"<p>{d.get('benchmark_goal','')}</p>" if d.get("benchmark_goal") else ""
        return _card_html(d.get("name", id_), kind, meta, body=body)

    @env.macro
    def skill_card(id_):
        matches = list(SKILLS_DIR.rglob(f"{id_}/SKILL.md"))
        if not matches:
            return _missing("Skill", id_)
        rel = matches[0].relative_to(REPO).as_posix()
        category = matches[0].parent.parent.name
        url = f"https://github.com/Bokai-Zhao/Pathology-Wiki/blob/main/{rel}"
        return _card_html(
            f"Skill: {id_}",
            f"skill · {category}",
            "Documentation-form SKILL.md (CLAUDE.md §12).",
            body=f'<p>How Claude should use this object — see the SKILL doc at <code>{rel}</code>.</p>',
            links={"source": url},
        )

    @env.macro
    def local_graph(id_):
        """ConnectedPapers-style interactive 1-hop graph.

        Emits a div container with the precomputed 1-hop subgraph inlined as
        a JSON data attribute. `content/javascripts/local-graph.js` reads each
        such container at load time and renders a Cytoscape force-directed
        graph. Falls back to a Markdown list when JS is disabled or the
        node has no edges.
        """
        g = _graph()
        idx = g.get("reverse_index", {}).get(id_)
        by_id = _node_lookup()
        if idx is None:
            return _missing("Local graph data", id_)
        out_edges = idx.get("outgoing") or []
        in_edges = idx.get("incoming") or []
        if not out_edges and not in_edges:
            return (
                '!!! info "Local graph"\n'
                f'    `{id_}` has no edges in `knowledge/graph/edges.yaml` yet — orphan node.\n'
            )

        # Collect 1-hop subgraph nodes (including the center itself)
        center_node = by_id.get(id_) or {"id": id_, "type": "node", "label": id_}
        neighbour_ids: list[str] = []
        for e in out_edges:
            if e["to"] not in neighbour_ids and e["to"] != id_:
                neighbour_ids.append(e["to"])
        for e in in_edges:
            if e["from"] not in neighbour_ids and e["from"] != id_:
                neighbour_ids.append(e["from"])

        def _md_to_url(md_rel: str) -> str:
            # MkDocs `use_directory_urls` (default true) maps foo.md → foo/.
            # The JS uses this href as `window.location.href`, so we need
            # directory-style URLs, not raw .md paths.
            if md_rel.endswith(".md"):
                stem = md_rel[:-3]
                return stem + "/" if stem else "./"
            return md_rel

        sub_nodes = []
        for nid in [id_] + neighbour_ids:
            n = by_id.get(nid, {"id": nid, "type": "node", "label": nid})
            ntype = n.get("type", "node")
            sub_nodes.append({
                "id": nid,
                "label": n.get("label") or nid,
                "type": ntype,
                "href": _md_to_url(rel_md(_src_path(ntype, nid))),
            })

        sub_edges = []
        for e in out_edges:
            sub_edges.append({"from": id_, "to": e["to"], "type": e["type"]})
        for e in in_edges:
            sub_edges.append({"from": e["from"], "to": id_, "type": e["type"]})

        payload = {"nodes": sub_nodes, "edges": sub_edges}
        # Use HTML escaping for the JSON in the data attribute
        import html
        json_attr = html.escape(json.dumps(payload, ensure_ascii=False), quote=True)

        # Build a legend of the types present in the subgraph
        types_in_subgraph: list[str] = []
        for n in sub_nodes:
            if n["type"] not in types_in_subgraph:
                types_in_subgraph.append(n["type"])
        type_color_map = {
            "article": "var(--pwiki-color-article)",
            "clinical_article": "var(--pwiki-color-article)",
            "technical_article": "var(--pwiki-color-article)",
            "review_article": "var(--pwiki-color-article)",
            "benchmark_article": "var(--pwiki-color-article)",
            "dataset_article": "var(--pwiki-color-article)",
            "tool_article": "var(--pwiki-color-article)",
            "guideline_article": "var(--pwiki-color-article)",
            "perspective_article": "var(--pwiki-color-article)",
            "preprint": "var(--pwiki-color-article)",
            "method": "var(--pwiki-color-method)",
            "dataset": "var(--pwiki-color-dataset)",
            "model": "var(--pwiki-color-model)",
            "tool": "var(--pwiki-color-tool)",
            "benchmark": "var(--pwiki-color-benchmark)",
            "skill": "var(--pwiki-color-skill)",
        }
        legend_seen = set()
        legend_spans = []
        for t in types_in_subgraph:
            # Collapse article-* variants into a single legend item
            display = "article" if t in (
                "article", "clinical_article", "technical_article", "review_article",
                "benchmark_article", "dataset_article", "tool_article",
                "guideline_article", "perspective_article", "preprint",
            ) else t
            if display in legend_seen:
                continue
            legend_seen.add(display)
            color = type_color_map.get(t, "var(--pwiki-color-default)")
            legend_spans.append(
                f'<span><i style="background:{color}"></i>{display}</span>'
            )
        legend_html = "".join(legend_spans)

        n_out = len(out_edges)
        n_in = len(in_edges)
        count_str = f"{n_out} out · {n_in} in · {len(neighbour_ids)} neighbours"

        # Fallback list for no-JS / SSR / build-test environments
        fallback_lines = ["<div class=\"pwiki-localgraph-fallback\">"]
        fallback_lines.append("<strong>Local graph</strong> (text fallback — JS disabled)")
        fallback_lines.append("<ul>")
        for e in out_edges:
            target = by_id.get(e["to"], {})
            label = target.get("label", e["to"])
            href = rel_md(_src_path(target.get("type", "node"), e["to"]))
            fallback_lines.append(
                f'<li><code>{e["type"]}</code> → <a href="{href}">{html.escape(label)}</a></li>'
            )
        for e in in_edges:
            source = by_id.get(e["from"], {})
            label = source.get("label", e["from"])
            href = rel_md(_src_path(source.get("type", "node"), e["from"]))
            fallback_lines.append(
                f'<li><a href="{href}">{html.escape(label)}</a> → <code>{e["type"]}</code></li>'
            )
        fallback_lines.append("</ul></div>")
        fallback_html = "".join(fallback_lines)

        return (
            '<div class="pwiki-localgraph">'
            '<div class="pwiki-localgraph-header">'
            f'<strong>Local graph</strong>'
            f'<span class="pwiki-localgraph-legend">{legend_html}'
            f'<span style="margin-left:0.6rem;opacity:0.7">{count_str}</span>'
            '</span></div>'
            f'<div class="pwiki-localgraph-canvas" data-graph="{json_attr}" '
            f'data-center="{id_}"></div>'
            '<noscript>' + fallback_html + '</noscript>'
            '</div>\n'
        )

    @env.macro
    def node_link(id_, label=None):
        return link_for(id_, label)

    @env.macro
    def graph_summary():
        g = _graph()
        return {
            "n_nodes": len(g.get("nodes", [])),
            "n_edges": len(g.get("edges", [])),
            "stats": g.get("stats", {}),
        }

    @env.macro
    def node_counts():
        """Return per-type node counts for the homepage dashboard."""
        g = _graph()
        counts: dict[str, int] = {}
        for n in g.get("nodes", []):
            t = n.get("type", "node")
            # Collapse all article subtypes into 'article'
            if t in (
                "article", "clinical_article", "technical_article", "review_article",
                "benchmark_article", "dataset_article", "tool_article",
                "guideline_article", "perspective_article", "preprint",
            ):
                t = "article"
            counts[t] = counts.get(t, 0) + 1
        counts["_total_nodes"] = len(g.get("nodes", []))
        counts["_total_edges"] = len(g.get("edges", []))
        return counts
