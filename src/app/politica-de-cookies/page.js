import React from 'react';

export const metadata = {
  title: 'Política de Cookies | OnChess',
  description: 'Política de cookies de OnChess - Información sobre cómo utilizamos las cookies en nuestro sitio web',
};

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Política de Cookies</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">
            Última actualización: 18 de abril de 2025
          </p>

          <p className="mb-4">
            Esta Política de Cookies explica qué son las cookies y cómo las utilizamos en OnChess. Debes leer esta política para entender qué son las cookies, 
            cómo las usamos, los tipos de cookies que utilizamos, la información que recopilamos usando cookies y cómo esa información es utilizada, 
            y cómo controlar las preferencias de cookies.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">¿Qué son las Cookies?</h2>
          <p className="mb-4">
            Las cookies son pequeños archivos de texto que se utilizan para almacenar pequeñas piezas de información. Se almacenan en tu dispositivo cuando 
            el sitio web se carga en tu navegador. Estas cookies nos ayudan a hacer que el sitio web funcione correctamente, a hacerlo más seguro, 
            a proporcionar una mejor experiencia de usuario, a entender cómo funciona el sitio web y a analizar qué funciona y dónde necesita mejoras.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Uso Actual de Cookies</h2>
          <p className="mb-4">
            Actualmente, OnChess utiliza un número limitado de cookies técnicas necesarias para el funcionamiento del sitio. Estas incluyen:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Cookies técnicas para el correcto funcionamiento de Next.js (el framework que utiliza nuestra web)</li>
            <li>Cookies de sesión (si decides registrarte o iniciar sesión)</li>
          </ul>
          <p className="mb-4">
            No utilizamos actualmente cookies de rastreo, publicidad o análisis de terceros. Si esto cambiara en el futuro, actualizaremos esta política y te solicitaremos tu consentimiento antes de implementar dichas cookies.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Posibles Cookies Futuras</h2>
          <p className="mb-4">
            En el futuro, podríamos implementar:
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Cookies de Estadísticas</h3>
          <p className="mb-4">
            Estas cookies almacenarían información como el número de visitantes del sitio web, qué páginas han sido visitadas, 
            la fuente de la visita, etc. Estos datos nos ayudarían a entender y analizar qué tan bien funciona el sitio web y dónde necesita mejoras.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Cookies de Marketing</h3>
          <p className="mb-4">
            Si en el futuro nuestro sitio web muestra anuncios, estas cookies se utilizarían para personalizar los anuncios que te mostramos para que sean relevantes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Control de tus preferencias de Cookies</h2>
          <p className="mb-4">
            Puedes controlar y/o eliminar las cookies según desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y puedes configurar 
            la mayoría de los navegadores para evitar que se coloquen.
          </p>
          <p className="mb-4">
            Para saber más sobre cómo gestionar las cookies en tu navegador, puedes utilizar la función de ayuda de tu navegador o visitar 
            <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"> aboutcookies.org</a>.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contacto</h2>
          <p className="mb-4">
            Si tienes alguna pregunta sobre esta política de cookies, por favor contacta con nosotros:
          </p>
          <p className="mb-4">
            Por correo electrónico: <a href="mailto:hello@tauideas.tech" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">hello@tauideas.tech</a>
          </p>
        </div>
      </div>
    </div>
  );
}