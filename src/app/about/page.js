import React from "react";

export const metadata = {
  title: "About OnChess",
  description: "Learn more about OnChess, our mission and services",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          About OnChess
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">
            OnChess es una página personal de Marcos Javier Martínez Ramos en la
            que cuento parte de mi experiencia en el ajedrez. También se
            utilizará como plataforma para cursos y lecciones de ajedrez. Tan
            importante como el ajedrez es la generación de aplicaciones
            relacionadas con el ajedrez.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestra Misión</h2>
          <p className="mb-4">
            Soy un jugador de aficionado de ajedrez desde hace más de 35 años en
            la zona de A Coruña (España). Actualmente jugando con el Club de
            Ajedrez Alexandre Bóveda (A Coruña) y además colaboro con la entidad
            Xadrez das Mariñas (Cambre, A Coruña) en la organización de eventos.
            Llevo impartiendo actividad docente en ajedrez desde los catorce
          </p>
          años en colegios y clubes. Actualmente está colaborando con:
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              Coruña British International School: Clases de iniciación de
              ajedrez
            </li>
            <li>
              Xadrez das Mariñas - Xadrez e Memoria: Clases de iniciación para
              personas adultas con el objetivo que el ajedrez sirva para manener
              la mente activa.
            </li>
            <li>
              Xadrez das Mariñas - Curso de Xadrez: Clases avanzadas para
              jugadores de club
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Perfiles de ajedrez online
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <a
                href="https://ratings.fide.com/profile/22211349"
                target="_blank"
                rel="noopener noreferrer"
              >
                FIDE
              </a>{" "}
              - Perfil de jugador de ajedrez en la Federación Internacional de
              Ajedrez
            </li>
            <li>
              <a
                href="https://lichess.org/@/marcosjavier"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lichess
              </a>{" "}
              - Perfil de jugador de ajedrez en la plataforma Lichess
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Torneos presenciales (OTB)
          </h2>
          <h3 className="text-xl font-medium mt-6 mb-3">
            Últimos resultados OTB
          </h3>
          <h4 className="text-lg font-medium mt-4 mb-2">2025</h4>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <a
                href="https://info64.org/team/i-aberto-xadrez-lostrego-de-vilaboa-por-equipos/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                I Aberto Xadrez Lostrego de Vilaboa por Equipos (Alexandre
                Bóveda A) (1º)
              </a>
            </li>
          </ul>
          <h4 className="text-lg font-medium mt-4 mb-2">2024</h4>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <a
                href="https://info64.org/ii-erlac-clasico-sub2400/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                II ERLAC Clasico Sub2400 (2º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/lxxvi-torneo-nadal/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                LXXVI TORNEO NADAL (23º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/ii-cto-blitz-xdm/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                II CTO BLITZ XDM (8º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/ii-open-internacional-jose-antonio-ferreno/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                II Open Internacional Jose Antonio Ferreno (31º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/aniversario-incude/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aniversario INCUDE (4º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/xv-concello-de-rianxo/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                XV Concello de Rianxo (28º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/xv-torneo-san-roque/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                XV Torneo San Roque (13º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/xvii-memorial-miro/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                XVII Memorial Miro (19º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/i-cto-xadrez-blitz-xdm/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                I Cto. Xadrez Blitz XDM (3º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/xix-ludo-lostrego-torneo-merino/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                XIX Ludo Lostrego - Torneo Merino (2º)
              </a>
            </li>
            <li>
              <a
                href="https://www.xn--xadrezdasmarias-brb.org/2024/06/resultados-v-liga-xadrez-das-marinas.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                V Liga Xadrez da Mariñas por Equipos (Xadrez das Mariñas) (1º)
              </a>
            </li>
            <li>
              <a
                href="https://www.xn--xadrezdasmarias-brb.org/2024/05/11-xornada-de-liga.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Liga Gallega 2 División 2024 (Xadrez das Mariñas) (1º)
              </a>
            </li>
            <li>
              <a
                href="https://www.xadrezuniversitario.org/2024/05/resultados-torneo-dia-1.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Torneo de XXX Aniversario CIDU 1 Maio 2024 (2º)
              </a>
            </li>
            <li>
              <a
                href="https://www.palaestra.eu/2024/02/resultados-torneo-entroido-absoluto.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Torneo de Entroido Absoluto 2024 (1º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/provincial-a-coruna-absoluto/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                Provincial Absoluto A Coruña 2024 (31º)
              </a>
            </li>
          </ul>
          <h4 className="text-lg font-medium mt-4 mb-2">2023</h4>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              <a
                href="https://info64.org/xxii-nadal-en-carral/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                XXII Nadal de Carral (3º)
              </a>
            </li>
            <li>
              <a
                href="https://www.xadrecista.eu/2023/12/resultados-do-lxxv-torneo-de-navidad.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                LXXV Torneo de Navidad Artesanos (1º)
              </a>
            </li>
            <li>
              <a
                href="https://www.deporcultura.eu/2023/12/resultados-torneo-de-nadal.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                XII Torneo de Nadal de Xadrez (1º)
              </a>
            </li>
            <li>
              <a
                href="https://www.xadrecista.eu/2023/11/resultados-torneo-50-anos.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Torneo 50 anos primer suizo en A Coruña (1º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/copa-gonzalez-march/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                COPA GONZALEZ MARCH (1º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/viii-torneo-san-enroque/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                VIII Torneo SAN enROQUE (5º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/xxii-agosto-en-cambre/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                XXII Agosto en Cambre (43º)
              </a>
            </li>
            <li>
              <a
                href="https://info64.org/xvi-memorial-miro/standings"
                target="_blank"
                rel="noopener noreferrer"
              >
                XVI Memorial Miro (23º)
              </a>
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contacto</h2>
          <p className="mb-4">
            Si tienes preguntas, sugerencias o simplemente quieres ponerte en
            contacto con nosotros, puedes enviarnos un correo electrónico a{" "}
            <a
              href="mailto:hello@tauideas.tech"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              hello@tauideas.tech
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
