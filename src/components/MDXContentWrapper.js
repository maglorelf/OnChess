'use client';

import { MDXRemote } from 'next-mdx-remote';
import Button from './Button';

const MDXContentWrapper = ({ source }) => {
  return <MDXRemote {...source} components={{ Button }} />;
};

export default MDXContentWrapper;
