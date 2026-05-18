import React from 'react';
import ObjectCard from './ObjectCard';
import models from '@site/src/data/models.json';

type Model = {
  id: string;
  name: string;
  model_family?: string;
  architecture?: string;
  parameter_count?: string;
  weights_access?: string;
  released_by?: string;
  links?: Record<string, string>;
};

export default function ModelCard({id}: {id: string}) {
  const m = (models as unknown as Model[]).find((x) => x.id === id);
  if (!m) return <ObjectCard title={id} type="model" meta={`No data for ${id}`} />;
  return (
    <ObjectCard
      title={m.name}
      type={`model · ${m.model_family ?? '?'}`}
      meta={
        <>
          {m.architecture ? `${m.architecture}` : ''}
          {m.parameter_count ? ` · ${m.parameter_count}` : ''}
          {m.weights_access ? ` · weights ${m.weights_access}` : ''}
          {m.released_by ? ` · ${m.released_by}` : ''}
        </>
      }
      links={m.links}
    />
  );
}
