'use client';

import dynamic from 'next/dynamic';

// Importaciones dinámicas DENTRO del componente cliente
const MDXContentWrapper = dynamic(() => import('@/components/MDXContentWrapper'), {
  ssr: false,
  loading: () => <div className="animate-pulse">Loading MDX content...</div>,
});

const MarkdownContent = dynamic(() => import('@/components/MarkdownContent'), {
  ssr: false,
  loading: () => <div className="animate-pulse">Loading Markdown content...</div>,
});

export default function BlogRenderer({ fileType, source, content }) {
  if (fileType === 'mdx') {
    return <MDXContentWrapper source={source} />;
  } else {
    return <MarkdownContent content={content} />;
  }
}
