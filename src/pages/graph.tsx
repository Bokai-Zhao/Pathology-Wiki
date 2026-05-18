import React from 'react';
import Layout from '@theme/Layout';
import graph from '@site/src/data/graph.json';

type Node = {id: string; type: string; label: string};
type Edge = {from: string; to: string; type: string};

export default function GraphIndex() {
  const data = graph as unknown as {nodes: Node[]; edges: Edge[]; stats?: Record<string, number>};
  return (
    <Layout title="Graph">
      <main style={{padding: '2rem', maxWidth: 960, margin: '0 auto'}}>
        <h1>Knowledge Graph</h1>
        <p>{data.nodes.length} nodes · {data.edges.length} edges. Source of truth: <code>knowledge/graph/edges.yaml</code>.</p>
        <p>This page is a placeholder. A real interactive graph viz (cytoscape / d3) will land in a later iteration.</p>
        <h2>Nodes</h2>
        <table>
          <thead><tr><th>id</th><th>type</th><th>label</th></tr></thead>
          <tbody>
            {data.nodes.map((n) => (
              <tr key={n.id}>
                <td><code>{n.id}</code></td>
                <td>{n.type}</td>
                <td>{n.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Edges</h2>
        <table>
          <thead><tr><th>from</th><th>type</th><th>to</th></tr></thead>
          <tbody>
            {data.edges.map((e, i) => (
              <tr key={i}>
                <td><code>{e.from}</code></td>
                <td>{e.type}</td>
                <td><code>{e.to}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </Layout>
  );
}
