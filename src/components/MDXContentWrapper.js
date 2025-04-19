'use client';

import { MDXRemote } from 'next-mdx-remote';
import Button from './Button';

const MDXContentWrapper = ({ source }) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <MDXRemote {...source} components={{ Button }} />
    </div>
  );
};
export default MDXContentWrapper;
