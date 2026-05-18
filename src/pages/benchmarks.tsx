import React from 'react';
import Layout from '@theme/Layout';
import benchmarks from '@site/src/data/benchmarks.json';

type Benchmark = {id: string; name: string; benchmark_goal?: string};

export default function BenchmarksIndex() {
  const list = benchmarks as Benchmark[];
  return (
    <Layout title="Benchmarks">
      <main style={{padding: '2rem', maxWidth: 960, margin: '0 auto'}}>
        <h1>Benchmarks</h1>
        {list.length === 0 ? (
          <p><em>No benchmarks yet — add via <code>/add_benchmark</code>.</em></p>
        ) : (
          <ul>
            {list.map((b) => (
              <li key={b.id}>
                <strong>{b.name}</strong>{b.benchmark_goal ? ` — ${b.benchmark_goal}` : ''}
              </li>
            ))}
          </ul>
        )}
      </main>
    </Layout>
  );
}
