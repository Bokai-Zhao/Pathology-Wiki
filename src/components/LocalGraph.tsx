import React from 'react';
import graphData from '@site/src/data/graph.json';

type Edge = {from: string; to: string; type: string};
type Node = {id: string; type: string; label: string};
type ReverseIndex = Record<string, {incoming: {from: string; type: string}[]; outgoing: {to: string; type: string}[]}>;

type Props = {
  nodeId: string;
  hops?: 1 | 2;
};

export default function LocalGraph({nodeId, hops = 1}: Props) {
  const data = graphData as unknown as {nodes: Node[]; edges: Edge[]; reverse_index: ReverseIndex};
  const nodeMap = new Map(data.nodes.map((n) => [n.id, n]));
  const center = nodeMap.get(nodeId);
  if (!center) {
    return (
      <div className="pwiki-local-graph">
        <em>Local graph unavailable: node <code>{nodeId}</code> not in graph.json. Run scripts/python/build_graph.py.</em>
      </div>
    );
  }
  const idx = data.reverse_index[nodeId] ?? {incoming: [], outgoing: []};
  const renderEdge = (otherId: string, edgeType: string, dir: 'in' | 'out') => {
    const other = nodeMap.get(otherId);
    const arrow = dir === 'out' ? '→' : '←';
    return (
      <li key={`${dir}-${edgeType}-${otherId}`}>
        <code>{edgeType}</code> {arrow}{' '}
        <a href={`/${other?.type ?? 'unknown'}/${otherId}`}>{other?.label ?? otherId}</a>{' '}
        <span style={{color: 'var(--ifm-color-emphasis-600)'}}>({other?.type ?? '?'})</span>
      </li>
    );
  };
  return (
    <div className="pwiki-local-graph">
      <strong>Local graph (1-hop) — {center.label}</strong>
      {idx.outgoing.length > 0 && (
        <>
          <div style={{marginTop: 8}}>Outgoing:</div>
          <ul>{idx.outgoing.map((e) => renderEdge(e.to, e.type, 'out'))}</ul>
        </>
      )}
      {idx.incoming.length > 0 && (
        <>
          <div>Incoming:</div>
          <ul>{idx.incoming.map((e) => renderEdge(e.from, e.type, 'in'))}</ul>
        </>
      )}
      {idx.incoming.length === 0 && idx.outgoing.length === 0 && (
        <div><em>Orphan node — no edges yet. Flag in the next update report.</em></div>
      )}
      {hops === 2 && (
        <div style={{marginTop: 8, color: 'var(--ifm-color-emphasis-600)'}}>
          <em>2-hop view: TODO (viz library + collapsible neighbours).</em>
        </div>
      )}
    </div>
  );
}
