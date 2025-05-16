'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Button from './Button';

export default function BlogContent({ serializedMDX }) {
  // Custom components for MDX rendering
  const components = {
    Button,
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      <MDXRemote {...serializedMDX} components={components} />
    </div>
  );
}
