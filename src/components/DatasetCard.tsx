import React from 'react';
import ObjectCard from './ObjectCard';
import datasets from '@site/src/data/datasets.json';

type Dataset = {
  id: string;
  name: string;
  full_name?: string;
  modalities?: string[];
  organs?: string[];
  diseases?: string[];
  scale?: {n_slides?: number; n_patients?: number};
  access?: {public?: boolean; license?: string; access_url?: string};
  links?: Record<string, string>;
};

export default function DatasetCard({id}: {id: string}) {
  const d = (datasets as unknown as Dataset[]).find((x) => x.id === id);
  if (!d) return <ObjectCard title={id} type="dataset" meta={`No data for ${id}`} />;
  return (
    <ObjectCard
      title={d.full_name ?? d.name}
      type="dataset"
      meta={
        <>
          {(d.modalities ?? []).join(' · ')}
          {d.organs?.length ? ` · ${d.organs.join(', ')}` : ''}
          {d.scale?.n_slides ? ` · ${d.scale.n_slides.toLocaleString()} slides` : ''}
          {d.access?.license ? ` · ${d.access.license}` : ''}
        </>
      }
      links={{...(d.links ?? {}), access: d.access?.access_url}}
    />
  );
}
