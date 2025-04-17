import React from 'react';

export const metadata = {
  title: 'About OnChess',
  description: 'Learn more about OnChess, our mission and services',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">About OnChess</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">
            OnChess es tu destino para el conocimiento, estrategia y las últimas novedades en ajedrez online.
            Nuestra plataforma está dedicada a proporcionar a jugadores de todos los niveles recursos
            valiosos para mejorar su juego y mantenerse al día con la comunidad de ajedrez.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestra Misión</h2>
          <p className="mb-4">
            Nuestra misión es hacer el ajedrez accesible para todos. Creemos que el ajedrez no solo es un juego, 
            sino una herramienta para el desarrollo intelectual y personal. A través de nuestros recursos educativos,
            artículos y comunidad, buscamos inspirar a más personas a descubrir y disfrutar del juego del ajedrez.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestros Servicios</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Artículos y tutoriales sobre estrategia y táctica de ajedrez</li>
            <li>Noticias sobre torneos y eventos de ajedrez</li>
            <li>Recursos para jugadores de todos los niveles</li>
            <li>Comunidad para conectar con otros aficionados al ajedrez</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Equipo</h2>
          <p className="mb-4">
            OnChess está dirigido por un equipo de apasionados del ajedrez, dedicados a compartir su conocimiento
            y amor por este juego milenario. Nuestro equipo incluye jugadores de diferentes niveles, entrenadores
            y expertos en contenido relacionado con el ajedrez.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contacto</h2>
          <p className="mb-4">
            Si tienes preguntas, sugerencias o simplemente quieres ponerte en contacto con nosotros,
            puedes enviarnos un correo electrónico a <a href="mailto:info@onchess.tauideas.tech" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">info@onchess.tauideas.tech</a>.
          </p>
        </div>
      </div>
    </div>
  );
}