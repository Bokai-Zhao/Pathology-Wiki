import React from 'react';
import ObjectCard from './ObjectCard';
import articles from '@site/src/data/articles.json';

type Article = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue?: string;
  article_type: {primary: string; secondary?: string[]};
  links?: Record<string, string>;
};

export default function ArticleCard({id}: {id: string}) {
  const a = (articles as unknown as Article[]).find((x) => x.id === id);
  if (!a) return <ObjectCard title={id} type="article" meta={`No data for ${id}`} />;
  return (
    <ObjectCard
      title={a.title}
      type={`article · ${a.article_type.primary}`}
      meta={
        <>
          {a.authors?.slice(0, 3).join(', ')}
          {a.authors && a.authors.length > 3 ? ' et al.' : ''} · {a.year} {a.venue ? `· ${a.venue}` : ''}
        </>
      }
      links={a.links}
    />
  );
}
