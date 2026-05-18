import React from 'react';
import Layout from '@theme/Layout';
import methods from '@site/src/data/methods.json';

type Method = {id: string; name: string; stage?: string[]; core_idea?: string};

export default function MethodsIndex() {
  const list = methods as Method[];
  return (
    <Layout title="Methods">
      <main style={{padding: '2rem', maxWidth: 960, margin: '0 auto'}}>
        <h1>Methods</h1>
        <p>Method nodes positioned in the canonical 8-branch map (CLAUDE.md §7).</p>
        {list.length === 0 ? (
          <p><em>No methods yet — add via <code>/add_method</code>.</em></p>
        ) : (
          <ul>
            {list.map((m) => (
              <li key={m.id}>
                <strong>{m.name}</strong> — {(m.stage ?? []).join(', ') || 'unstaged'}
                {m.core_idea && <p>{m.core_idea}</p>}
              </li>
            ))}
          </ul>
        )}
      </main>
    </Layout>
  );
}
