import React from 'react';
import ObjectCard from './ObjectCard';
import skills from '@site/src/data/skills.json';

type Skill = {category: string; id: string; path: string};

export default function SkillCard({id}: {id: string}) {
  const s = (skills as unknown as Skill[]).find((x) => x.id === id);
  if (!s) return <ObjectCard title={id} type="skill" meta={`No SKILL.md found for ${id}`} />;
  return (
    <ObjectCard
      title={`Skill: ${s.id}`}
      type={`skill · ${s.category}`}
      meta="Documentation-form SKILL.md (CLAUDE.md §12)"
      links={{source: `https://github.com/your-org/pathology-wiki/blob/main/${s.path}`}}
    >
      <p style={{marginTop: 8}}>How Claude should use this object — see the SKILL doc at <code>{s.path}</code>.</p>
    </ObjectCard>
  );
}
