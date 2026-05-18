import React from 'react';
import ObjectCard from './ObjectCard';
import methods from '@site/src/data/methods.json';

type Method = {
  id: string;
  name: string;
  stage?: string[];
  parent_methods?: string[];
  core_idea?: string;
};

export default function MethodCard({id}: {id: string}) {
  const m = (methods as unknown as Method[]).find((x) => x.id === id);
  if (!m) return <ObjectCard title={id} type="method" meta={`No data for ${id}`} />;
  return (
    <ObjectCard
      title={m.name}
      type={`method · ${(m.stage ?? []).join(', ')}`}
      meta={(m.parent_methods ?? []).length > 0 ? `parent: ${(m.parent_methods ?? []).join(', ')}` : undefined}
    >
      {m.core_idea && <p style={{marginTop: 8}}>{m.core_idea}</p>}
    </ObjectCard>
  );
}
