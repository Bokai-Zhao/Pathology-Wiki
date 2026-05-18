/**
 * Build src/data/*.json from knowledge/ (object YAMLs + graph.json).
 *
 * Inputs:
 *   knowledge/{articles,methods,models,datasets,tools,benchmarks}/**\/*.yaml
 *   knowledge/graph/graph.json   (produced by scripts/python/build_graph.py)
 *
 * Outputs:
 *   src/data/articles.json   src/data/methods.json   src/data/models.json
 *   src/data/datasets.json   src/data/tools.json     src/data/benchmarks.json
 *   src/data/skills.json     src/data/graph.json     src/data/index.json
 *
 * Run order: validate_schema.py → build_graph.py → build_site_data.ts.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as yaml from "js-yaml";

// Resolve from cwd — npm script runs from repo root.
const REPO = process.cwd();
const KNOWLEDGE = path.join(REPO, "knowledge");
const SRC_DATA = path.join(REPO, "src", "data");
const SKILLS = path.join(REPO, "skills");

type Bundle = Record<string, string>;
const TYPE_DIRS: Bundle = {
  article: "articles",
  method: "methods",
  model: "models",
  dataset: "datasets",
  tool: "tools",
  benchmark: "benchmarks",
};

function walk(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p, exts));
    else if (exts.some((e) => p.endsWith(e))) out.push(p);
  }
  return out;
}

function loadYaml(p: string): unknown {
  return yaml.load(fs.readFileSync(p, "utf-8"));
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function buildBundle(type: keyof typeof TYPE_DIRS) {
  const root = path.join(KNOWLEDGE, TYPE_DIRS[type]);
  const files = walk(root, [".yaml", ".yml"]);
  const items = files.map((f) => loadYaml(f)).filter(Boolean);
  return items;
}

function buildSkills() {
  const skillFiles = walk(SKILLS, ["SKILL.md"]);
  return skillFiles.map((p) => {
    const rel = path.relative(REPO, p);
    const parts = rel.split(path.sep); // skills/<category>/<id>/SKILL.md
    return {
      category: parts[1],
      id: parts[2],
      path: rel,
    };
  });
}

function main() {
  ensureDir(SRC_DATA);

  for (const t of Object.keys(TYPE_DIRS) as (keyof typeof TYPE_DIRS)[]) {
    const items = buildBundle(t);
    fs.writeFileSync(
      path.join(SRC_DATA, `${TYPE_DIRS[t]}.json`),
      JSON.stringify(items, null, 2)
    );
  }

  fs.writeFileSync(
    path.join(SRC_DATA, "skills.json"),
    JSON.stringify(buildSkills(), null, 2)
  );

  // copy graph.json from knowledge/graph/graph.json if present
  const graphIn = path.join(KNOWLEDGE, "graph", "graph.json");
  if (fs.existsSync(graphIn)) {
    fs.copyFileSync(graphIn, path.join(SRC_DATA, "graph.json"));
  } else {
    console.warn("no knowledge/graph/graph.json — run build_graph.py first");
  }

  // index
  const index: Record<string, number> = {};
  for (const t of Object.keys(TYPE_DIRS) as (keyof typeof TYPE_DIRS)[]) {
    const f = path.join(SRC_DATA, `${TYPE_DIRS[t]}.json`);
    index[t] = JSON.parse(fs.readFileSync(f, "utf-8")).length;
  }
  fs.writeFileSync(path.join(SRC_DATA, "index.json"), JSON.stringify(index, null, 2));

  console.log("site data built:", index);
}

main();
