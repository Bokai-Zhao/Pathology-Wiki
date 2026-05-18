import React, {ReactNode} from 'react';

type Props = {
  title: string;
  type: string;
  meta?: ReactNode;
  links?: Record<string, string | undefined>;
  children?: ReactNode;
};

export default function ObjectCard({title, type, meta, links, children}: Props) {
  return (
    <div className="pwiki-card">
      <div className="pwiki-card-meta">
        <span>{type.toUpperCase()}</span>
      </div>
      <h3>{title}</h3>
      {meta && <div className="pwiki-card-meta">{meta}</div>}
      {children}
      {links && (
        <div style={{marginTop: 8, fontSize: '0.9rem'}}>
          {Object.entries(links)
            .filter(([, v]) => Boolean(v))
            .map(([k, v]) => (
              <a key={k} href={v as string} target="_blank" rel="noreferrer" style={{marginRight: 12}}>
                {k}
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
