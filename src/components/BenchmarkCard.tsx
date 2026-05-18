import React from 'react';
import ObjectCard from './ObjectCard';
import benchmarks from '@site/src/data/benchmarks.json';

type Benchmark = {
  id: string;
  name: string;
  benchmark_goal?: string;
  benchmark_type?: string;
  datasets?: string[];
  tasks?: string[];
  metrics?: string[];
};

export default function BenchmarkCard({id}: {id: string}) {
  const b = (benchmarks as unknown as Benchmark[]).find((x) => x.id === id);
  if (!b) return <ObjectCard title={id} type="benchmark" meta={`No data for ${id}`} />;
  return (
    <ObjectCard
      title={b.name}
      type={`benchmark · ${b.benchmark_type ?? '?'}`}
      meta={
        <>
          datasets: {(b.datasets ?? []).join(', ')} · tasks: {(b.tasks ?? []).join(', ')}
        </>
      }
    >
      {b.benchmark_goal && <p style={{marginTop: 8}}>{b.benchmark_goal}</p>}
    </ObjectCard>
  );
}
