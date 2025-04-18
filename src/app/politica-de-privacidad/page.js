import React from 'react';

export const metadata = {
  title: 'Política de Privacidad | OnChess',
  description: 'Política de privacidad de OnChess - Información sobre cómo gestionamos tus datos',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Política de Privacidad</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">
            Última actualización: 15 de abril de 2025
          </p>

          <p className="mb-4">
            En OnChess, accesible desde onchess.tauideas.tech, una de nuestras principales prioridades es la privacidad de nuestros visitantes. 
            Este documento de Política de Privacidad contiene los tipos de información que es recolectada y registrada por OnChess y cómo la utilizamos.
          </p>

          <p className="mb-4">
            Si tienes preguntas adicionales o requieres más información sobre nuestra Política de Privacidad, no dudes en contactarnos.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Información que recopilamos</h2>
          <p className="mb-4">
            OnChess puede solicitar información personal, como tu nombre, dirección de correo electrónico y datos demográficos. 
            Además, automáticamente recibimos y registramos información desde tu navegador web, incluyendo tu dirección IP, 
            información de cookies y las páginas que solicitas.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Cómo utilizamos tu información</h2>
          <p className="mb-4">
            Utilizamos la información que recopilamos para:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Proporcionar, operar y mantener nuestro sitio web</li>
            <li>Mejorar, personalizar y expandir nuestro sitio web</li>
            <li>Entender y analizar cómo utilizas nuestro sitio web</li>
            <li>Desarrollar nuevos productos, servicios, características y funcionalidades</li>
            <li>Comunicarnos contigo, ya sea directamente o a través de uno de nuestros socios</li>
            <li>Enviarte correos electrónicos</li>
            <li>Encontrar y prevenir el fraude</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
          <p className="mb-4">
            OnChess utiliza 'cookies'. Estos archivos se utilizan para almacenar información, incluyendo las preferencias de los visitantes y las páginas del sitio web que el visitante accedió o visitó. La información se utiliza para optimizar la experiencia de los usuarios personalizando el contenido de nuestra página web según el tipo de navegador de los visitantes y/u otra información.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Derechos de privacidad GDPR</h2>
          <p className="mb-4">
            Queremos asegurarnos de que estás plenamente consciente de todos tus derechos de protección de datos. Todo usuario tiene derecho a lo siguiente:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Derecho de acceso</strong> – Tienes derecho a solicitar copias de tus datos personales.</li>
            <li><strong>Derecho de rectificación</strong> – Tienes derecho a solicitar que corrijamos cualquier información que creas que es inexacta.</li>
            <li><strong>Derecho de supresión</strong> – Tienes derecho a solicitar que eliminemos tus datos personales, bajo ciertas condiciones.</li>
            <li><strong>Derecho a restringir el procesamiento</strong> – Tienes derecho a solicitar que restrinjamos el procesamiento de tus datos personales, bajo ciertas condiciones.</li>
            <li><strong>Derecho a oponerte al procesamiento</strong> – Tienes derecho a oponerte a que procesemos tus datos personales, bajo ciertas condiciones.</li>
            <li><strong>Derecho a la portabilidad de datos</strong> – Tienes derecho a solicitar que transfiramos los datos que hemos recopilado a otra organización, o directamente a ti, bajo ciertas condiciones.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Información de contacto</h2>
          <p className="mb-4">
            Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos:
          </p>
          <p className="mb-4">
            Por correo electrónico: <a href="mailto:hello@tauideas.tech" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">hello@tauideas.tech</a>
          </p>
        </div>
      </div>
    </div>
  );
}