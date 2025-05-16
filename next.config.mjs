/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Añadimos configuración específica para páginas con contenido MDX
  experimental: {
    // Desactivar optimizaciones que pueden causar problemas con MDX
    optimizeCss: false,
    // Marcar páginas del blog como de bajo rendimiento para evitar problemas de prerenderizado
    largePageDataBytes: 512 * 1000,
  },
  // Eliminamos la configuración manual de Webpack para MDX
  // webpack: (config, { dev, isServer }) => {
  //   // Configuración específica para archivos MDX
  //   config.module.rules.push({
  //     test: /\.mdx?$/,
  //     use: [
  //       {
  //         loader: '@mdx-js/loader',
  //         options: {
  //           providerImportSource: '@mdx-js/react',
  //         },
  //       },
  //     ],
  //   });
  //
  //   return config;
  // },
};

export default nextConfig;
