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
            Última actualización: 15 de abril de 2025
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

          <h2 className="text-2xl font-semibold mt-8 mb-4">¿Cómo utilizamos las Cookies?</h2>
          <p className="mb-4">
            Como la mayoría de los servicios en línea, nuestro sitio web utiliza cookies propias y de terceros para varios propósitos. Las cookies propias 
            son principalmente necesarias para que el sitio web funcione correctamente, y no recopilan ninguno de tus datos personales identificables.
          </p>
          <p className="mb-4">
            Las cookies de terceros utilizadas en nuestro sitio web son principalmente para entender cómo funciona el sitio web, cómo interactúas con nuestro sitio web, 
            mantener nuestros servicios seguros, proporcionar anuncios que sean relevantes para ti, y en general proporcionarte una mejor y mejorada experiencia de usuario 
            y ayudar a acelerar tus futuras interacciones con nuestro sitio web.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Tipos de Cookies que utilizamos</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Cookies Esenciales</h3>
          <p className="mb-4">
            Algunas cookies son esenciales para que puedas experimentar la funcionalidad completa de nuestro sitio. Nos permiten mantener las sesiones de usuario 
            y prevenir cualquier amenaza de seguridad. No recopilan ni almacenan ninguna información personal.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Cookies de Estadísticas</h3>
          <p className="mb-4">
            Estas cookies almacenan información como el número de visitantes del sitio web, el número de visitantes únicos, qué páginas del sitio web han sido visitadas, 
            la fuente de la visita, etc. Estos datos nos ayudan a entender y analizar qué tan bien funciona el sitio web y dónde necesita mejoras.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Cookies de Marketing</h3>
          <p className="mb-4">
            Nuestro sitio web puede mostrar anuncios. Estas cookies se utilizan para personalizar los anuncios que te mostramos para que sean significativos para ti. 
            Estas cookies también nos ayudan a hacer un seguimiento de la eficiencia de estas campañas publicitarias.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Control de tus preferencias de Cookies</h2>
          <p className="mb-4">
            Si decides cambiar tus preferencias más tarde durante tu sesión de navegación, puedes hacer clic en la pestaña 'Política de privacidad y cookies' 
            en tu pantalla. Esto mostrará el aviso de consentimiento de nuevo, permitiéndote cambiar tus preferencias o retirar tu consentimiento completamente.
          </p>
          <p className="mb-4">
            Además, diferentes navegadores proporcionan diferentes métodos para bloquear y eliminar las cookies utilizadas por los sitios web. 
            Puedes cambiar la configuración de tu navegador para bloquear/eliminar las cookies.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contacto</h2>
          <p className="mb-4">
            Si tienes alguna pregunta sobre esta política de cookies, por favor contacta con nosotros:
          </p>
          <p className="mb-4">
            Por correo electrónico: <a href="mailto:info@onchess.tauideas.tech" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">info@onchess.tauideas.tech</a>
          </p>
        </div>
      </div>
    </div>
  );
}