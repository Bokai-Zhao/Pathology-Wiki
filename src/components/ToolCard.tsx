import React from 'react';
import ObjectCard from './ObjectCard';
import tools from '@site/src/data/tools.json';

type Tool = {
  id: string;
  name: string;
  tool_type?: string[];
  language?: string[];
  license?: string;
  links?: Record<string, string>;
  agent_interface?: {
    install_command?: string;
    cli_available?: boolean;
    python_api_available?: boolean;
    docker_available?: boolean;
  };
};

export default function ToolCard({id}: {id: string}) {
  const t = (tools as unknown as Tool[]).find((x) => x.id === id);
  if (!t) return <ObjectCard title={id} type="tool" meta={`No data for ${id}`} />;
  return (
    <ObjectCard
      title={t.name}
      type={`tool · ${(t.tool_type ?? []).join(' / ')}`}
      meta={
        <>
          {(t.language ?? []).join(', ')} · license {t.license ?? 'unknown'}
          {t.agent_interface?.python_api_available ? ' · Python API' : ''}
          {t.agent_interface?.cli_available ? ' · CLI' : ''}
          {t.agent_interface?.docker_available ? ' · Docker' : ''}
        </>
      }
      links={t.links}
    >
      {t.agent_interface?.install_command && (
        <pre style={{padding: 8, marginTop: 8}}><code>{t.agent_interface.install_command}</code></pre>
      )}
    </ObjectCard>
  );
}
