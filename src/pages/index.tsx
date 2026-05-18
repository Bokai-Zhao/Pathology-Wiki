import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import index from '@site/src/data/index.json';

export default function Home() {
  const counts = index as Record<string, number>;
  return (
    <Layout title="Home" description="Pathology-Wiki — agent-extensible knowledge base for computational pathology">
      <main style={{padding: '2rem', maxWidth: 960, margin: '0 auto'}}>
        <h1>Pathology-Wiki</h1>
        <p>
          An agent-extensible knowledge base for computational pathology.
          Every article, tool, dataset, method, model, and benchmark produces
          five artifacts: structured YAML, graph entries, AlphaXiv-style blog,
          Claude-readable SKILL.md, and generated site data.
        </p>
        <p>See <code>CLAUDE.md</code> for the operational guide and <code>claude.md</code> for the design rationale.</p>

        <h2>Sample objects</h2>
        <ul>
          <li><Link to="/articles/technical/uni-2024">UNI — foundation model paper</Link></li>
          <li><Link to="/models/uni">UNI — model card</Link></li>
          <li><Link to="/tools/openslide">OpenSlide — WSI I/O library</Link></li>
          <li><Link to="/datasets/panda">PANDA — prostate Gleason dataset</Link></li>
        </ul>

        <h2>Counts</h2>
        <ul>
          {Object.entries(counts).map(([k, v]) => (
            <li key={k}><strong>{k}</strong>: {v}</li>
          ))}
        </ul>

        <h2>Sections</h2>
        <ul>
          <li><Link to="/methods">Methods</Link></li>
          <li><Link to="/benchmarks">Benchmarks</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/graph">Graph</Link></li>
        </ul>
      </main>
    </Layout>
  );
}
