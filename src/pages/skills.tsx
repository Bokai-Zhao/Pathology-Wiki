import React from 'react';
import Layout from '@theme/Layout';
import skills from '@site/src/data/skills.json';

type Skill = {category: string; id: string; path: string};

export default function SkillsIndex() {
  const grouped: Record<string, Skill[]> = {};
  for (const s of skills as Skill[]) {
    (grouped[s.category] ??= []).push(s);
  }
  return (
    <Layout title="Skills">
      <main style={{padding: '2rem', maxWidth: 960, margin: '0 auto'}}>
        <h1>Skills</h1>
        <p>Documentation-form SKILL.md files. High-frequency skills will be promoted to <code>.claude/skills/</code> registered Claude Code skills (CLAUDE.md §12).</p>
        {Object.entries(grouped).map(([cat, items]) => (
          <section key={cat}>
            <h2>{cat}</h2>
            <ul>
              {items.map((s) => (
                <li key={s.id}><code>{s.path}</code></li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </Layout>
  );
}
