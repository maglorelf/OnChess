import React from 'react';

export const metadata = {
  title: 'Términos de Uso | OnChess',
  description: 'Términos y condiciones de uso de la plataforma OnChess',
};

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Términos de Uso</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">
            Última actualización: 15 de abril de 2025
          </p>

          <p className="mb-4">
            Bienvenido a OnChess. Al acceder a este sitio web, asumes la aceptación y el cumplimiento de estos términos y condiciones de uso.
            Los siguientes términos de uso aplican a todos los usuarios del sitio.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Términos</h2>
          <p className="mb-4">
            Al acceder al sitio web OnChess, estás de acuerdo en cumplir con estos Términos de Servicio, todas las leyes y regulaciones aplicables, 
            y estás de acuerdo en que eres responsable del cumplimiento de cualquier ley local aplicable. Si no estás de acuerdo con alguno de 
            estos términos, se te prohíbe usar o acceder a este sitio. Los materiales contenidos en este sitio web están protegidos por las leyes 
            de derechos de autor y marcas comerciales aplicables.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Uso de Licencia</h2>
          <p className="mb-4">
            Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de OnChess, 
            únicamente para visualización transitoria personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título, 
            y bajo esta licencia no puedes:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Modificar o copiar los materiales</li>
            <li>Utilizar los materiales para cualquier propósito comercial o para exhibición pública (comercial o no comercial)</li>
            <li>Intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web de OnChess</li>
            <li>Eliminar cualquier derecho de autor u otras anotaciones de propiedad de los materiales</li>
            <li>Transferir los materiales a otra persona o "reflejar" los materiales en cualquier otro servidor</li>
          </ul>
          <p className="mb-4">
            Esta licencia se terminará automáticamente si violas cualquiera de estas restricciones y puede ser terminada por OnChess en cualquier momento.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Exención de responsabilidad</h2>
          <p className="mb-4">
            Los materiales en el sitio web de OnChess se proporcionan "tal cual". OnChess no ofrece garantías, expresas o implícitas, y por la presente 
            renuncia y niega todas las demás garantías, incluyendo, sin limitación, garantías implícitas o condiciones de comerciabilidad, idoneidad 
            para un fin particular, o no infracción de propiedad intelectual u otra violación de derechos.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitaciones</h2>
          <p className="mb-4">
            En ningún caso OnChess o sus proveedores serán responsables por cualquier daño (incluyendo, sin limitación, daños por pérdida de datos o beneficio, 
            o debido a interrupción del negocio) que surja del uso o la incapacidad de usar los materiales en el sitio web de OnChess, incluso si OnChess 
            o un representante autorizado de OnChess ha sido notificado oralmente o por escrito de la posibilidad de tal daño.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Modificaciones de los Términos</h2>
          <p className="mb-4">
            OnChess puede revisar estos términos de uso del sitio web en cualquier momento sin previo aviso. Al utilizar este sitio web, aceptas estar 
            vinculado a la versión actual de estos términos de servicio.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Ley aplicable</h2>
          <p className="mb-4">
            Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes españolas y te sometes irrevocablemente a la jurisdicción 
            exclusiva de los tribunales de dicho país.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contacto</h2>
          <p className="mb-4">
            Si tienes alguna pregunta sobre estos Términos, por favor contacta con nosotros en <a href="mailto:info@onchess.tauideas.tech" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">info@onchess.tauideas.tech</a>.
          </p>
        </div>
      </div>
    </div>
  );
}