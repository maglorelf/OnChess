'use client';

import { MDXProvider } from '@mdx-js/react';
import Button from './Button';

const components = {
  Button,
  // Puedes agregar más componentes aquí según sea necesario
  h1: props => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: props => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: props => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
  a: props => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
  ul: props => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: props => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: props => <li className="mb-1" {...props} />,
  blockquote: props => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4"
      {...props}
    />
  ),
};

export function ProvideMDX({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
