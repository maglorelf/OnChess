'use client';

import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import { ProvideMDX } from './MDXProvider';

// Importamos el botón dinámicamente para evitar problemas con los hooks
const DynamicButton = dynamic(() => import('./Button'), { ssr: false });

const MDXContentWrapper = ({ source }) => {
  // Componentes personalizados más completos para MDX y MD
  const components = {
    // Componentes personalizados de la aplicación
    // Reemplazamos Button con DynamicButton para evitar problemas con hooks
    Button: props => <DynamicButton {...props} />,
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      <ProvideMDX>
        <MDXRemote {...source} components={components} />
      </ProvideMDX>
    </div>
  );
};

export default MDXContentWrapper;
