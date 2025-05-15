// Spanish translations
const spanishTranslations = {
  // Metadata
  metadata: {
    description:
      'Tu destino para el conocimiento de ajedrez, estrategia y lo último en ajedrez online',
    siteTitle: 'OnChess',
  },

  // Common UI elements
  common: {
    loading: 'Cargando...',
    search: 'Buscar',
    filter: 'Filtrar',
    clear: 'Limpiar',
    viewAll: 'Ver todo',
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    readMore: 'Leer más',
    viewMore: 'Ver más',
    seeAll: 'Ver todo',
    download: 'Descargar',
    share: 'Compartir',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    register: 'Registrarse',
    profile: 'Perfil',
  },

  // Navigation
  nav: {
    home: 'Inicio',
    about: 'Acerca de',
    blog: 'Blog',
    resources: 'Recursos',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
  }, // Home page
  home: {
    hero: {
      label: 'La Revolución del Ajedrez',
      welcomePrefix: 'Bienvenido a',
      description:
        'Tu destino para el conocimiento del ajedrez, estrategia y lo último en ajedrez online. Eleva tu juego con consejos de expertos.',
      exploreBlog: 'Explorar Nuestro Blog',
      latestArticles: 'Últimos Artículos',
    },
    featuresSection: {
      title: 'Por Qué OnChess',
      subtitle:
        'Descubre un mundo de recursos de ajedrez diseñados para ayudar a jugadores de todos los niveles',
      feature1: {
        title: 'Estrategias Expertas',
        description:
          'Aprende estrategias y tácticas ganadoras de maestros del ajedrez y mejora tu juego.',
      },
      feature2: {
        title: 'Conocimientos Comunitarios',
        description:
          'Conéctate con otros entusiastas del ajedrez y comparte tus experiencias y conocimientos.',
      },
      feature3: {
        title: 'Últimas Noticias',
        description:
          'Mantente actualizado con las últimas tendencias, torneos y desarrollos en el mundo del ajedrez.',
      },
    },
    blogSection: {
      label: 'Nuestro Contenido Más Reciente',
      title: 'Últimos Artículos',
      subtitle: 'Descubre estrategias, historia y conocimientos sobre el juego de ajedrez.',
      viewAll: 'Ver Todos los Artículos',
    },
    ctaSection: {
      title: '¿Listo para mejorar tu juego de ajedrez?',
      description:
        'Únete a nuestra comunidad y obtén acceso a estrategias de expertos, tutoriales exclusivos y conecta con otros entusiastas del ajedrez.',
      button: 'Comienza a Aprender Hoy',
    },
  },

  // Footer
  footer: {
    copyright: '© {year} OnChess. Todos los derechos reservados.',
    privacyPolicy: 'Política de Privacidad',
    termsOfUse: 'Términos de Uso',
    cookiePolicy: 'Política de Cookies',
    quickLinks: 'Enlaces Rápidos',
  }, // Blog preview
  blogPreview: {
    readArticle: 'Leer Artículo',
  },

  // Resources page
  resources: {
    title: 'Recursos de Ajedrez',
    subtitle: 'Materiales educativos para mejorar tu ajedrez',
    metaTitle: 'Recursos de Ajedrez - OnChess',
    metaDescription: 'Recursos educativos para ayudarte a mejorar tus habilidades de ajedrez',
    loading: 'Cargando recursos...',
    searchPlaceholder: 'Buscar recursos...',
    filters: 'Filtros',
    clearFilters: 'Limpiar todos los filtros',
    category: 'Categoría',
    contentType: 'Tipo de Contenido',
    tags: 'Etiquetas',
    noResourcesFound: 'No se encontraron recursos',
    signInPrompt: 'Inicia sesión para acceder a todos los recursos',
    previewMessage:
      'Estás viendo vistas previas limitadas. Inicia sesión para acceder al contenido completo.',
    filterByCategory: 'Filtrar por Categoría',
    filterByContentType: 'Filtrar por Tipo de Contenido',
    filterByTags: 'Filtrar por Etiquetas',
    categoryTheory: 'Teoría',
    categoryPractice: 'Práctica',
    contentTypeText: 'Texto',
    contentTypeVideo: 'Vídeo',
    contentTypePuzzle: 'Ejercicio',
    contentTypePgn: 'PGN',
    contentTypePdf: 'PDF',
    backToResources: 'Volver a recursos',
    resourceNotFound: 'Recurso no encontrado',
    resourceNotFoundDesc: 'El recurso que estás buscando no existe o ha sido movido.',
    accessLevelStudent: 'Este contenido requiere acceso de estudiante.',
    accessLevelPremium: 'Este es contenido premium para profesores y entrenadores.',
    accessLevelMessage: 'No tienes acceso a este contenido.',
    studentAccessMessage:
      'Los estudiantes tienen acceso a este contenido. Contacta con el administrador si eres estudiante.',
    premiumAccessMessage: 'Los profesores y entrenadores tienen acceso a este contenido premium.',
    contactSupportMessage: 'Por favor, contacta con soporte para más información.',
    relatedResources: 'Recursos Relacionados',
    pgnFileDownload: 'Descargar archivo PGN',
    pgnFileDesc: 'Abre este archivo en tu software de análisis de ajedrez preferido.',
    pdfDocumentView: 'Ver PDF',
    interactivePuzzle: 'Ejercicio Interactivo',
    viewResource: 'Ver Recurso',
    showingCount: 'Mostrando {count} de {total} {resourceWord}',
    resource: 'recurso',
    resources: 'recursos',
    tag_initiation: 'Iniciación',
    tag_medium: 'Intermedio',
    tag_advance: 'Avanzado',
    tag_opening: 'Apertura',
    tag_middlegame: 'Medio juego',
    tag_ending: 'Final',
    tag_test: 'Test',
    tag_game: 'Partida',
    tag_tactics: 'Tácticas',
    tag_strategy: 'Estrategia',
    tag_endgame: 'Finales',
    tag_analysis: 'Análisis',
  },

  // Blog page
  blog: {
    description:
      'Artículos y conocimientos sobre estrategia de ajedrez, historia y juego online. Amplía tu comprensión del juego.',
    noEntries: 'No se encontraron entradas de blog.',
    backToBlog: 'Volver al blog',
    authorBy: 'Por',
    readingTime: '{time} min de lectura',
    label: 'Centro de Conocimiento',
    title: 'Blog de Ajedrez1',
    subtitle: 'Noticias, artículos y actualizaciones del mundo del ajedrez',
    readTime: '{time} minutos de lectura',
    publishedOn: 'Publicado el {date}',
    recentPosts: 'Publicaciones Recientes',
    popularPosts: 'Publicaciones Populares',
    categories: 'Categorías',
    tags: 'Etiquetas',
    relatedPosts: 'Publicaciones Relacionadas',
    authorBy: 'Por {author}',
    postNotFound: 'Entrada no encontrada',
    postNotFoundDesc: 'La entrada del blog que estás buscando no existe o ha sido movida.',
  },

  // User profiles
  profile: {
    title: 'Tu Perfil',
    personalInfo: 'Información Personal',
    name: 'Nombre',
    email: 'Correo electrónico',
    username: 'Nombre de usuario',
    changePassword: 'Cambiar contraseña',
    currentPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña',
    confirmNewPassword: 'Confirmar nueva contraseña',
    updateProfileButton: 'Actualizar perfil',
    progress: 'Progreso de aprendizaje',
    resourcesCompleted: 'Recursos completados',
    resourcesInProgress: 'Recursos en progreso',
    achievements: 'Logros',
    memberSince: 'Miembro desde {date}',
    currentLanguage: 'Idioma actual',
    languages: {
      english: 'Inglés',
      spanish: 'Español',
    },
    languageDescription:
      'Tu preferencia de idioma afecta el contenido que se muestra en todo el sitio. Algunos contenidos podrían no estar disponibles en todos los idiomas.',
  },

  // Authentication
  auth: {
    login: 'Iniciar Sesión',
    loginSubtitle: 'Bienvenido de nuevo a OnChess',
    register: 'Crear una Cuenta',
    registerSubtitle: 'Únete a OnChess hoy',
    email: 'Correo Electrónico',
    username: 'Nombre de Usuario',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    forgotPassword: '¿Olvidaste tu Contraseña?',
    haveAccount: '¿Ya tienes una cuenta?',
    noAccount: '¿No tienes una cuenta?',
    signInWith: 'Iniciar sesión con {provider}',
    agreeToTerms: 'Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad',
    loginButton: 'Iniciar Sesión',
    registerButton: 'Registrarse',
    rememberMe: 'Recordarme',
  },

  // Validation and messages
  validation: {
    required: '{field} es obligatorio',
    invalidEmail: 'Por favor, introduce una dirección de correo electrónico válida',
    passwordLength: 'La contraseña debe tener al menos 8 caracteres',
    passwordMatch: 'Las contraseñas no coinciden',
    usernameLength: 'El nombre de usuario debe tener entre 3 y 20 caracteres',
  },

  // Notifications
  notifications: {
    welcome: '¡Bienvenido a OnChess!',
    loginSuccess: 'Sesión iniciada correctamente',
    logoutSuccess: 'Sesión cerrada correctamente',
    profileUpdated: 'Perfil actualizado correctamente',
    passwordChanged: 'Contraseña cambiada correctamente',
    emailVerification: 'Por favor, verifica tu correo electrónico para activar tu cuenta',
    resetPasswordLink: 'Enlace de restablecimiento de contraseña enviado a tu correo electrónico',
  },

  // Error messages
  errors: {
    generic: 'Algo salió mal. Por favor, inténtalo de nuevo.',
    login: 'Inicio de sesión fallido. Por favor, verifica tus credenciales.',
    register: 'Registro fallido. Por favor, inténtalo de nuevo.',
    unauthorized: 'Necesitas iniciar sesión para acceder a esta página',
    forbidden: 'No tienes permiso para acceder a este recurso',
    notFound: 'Página no encontrada',
    serverError: 'Error del servidor. Por favor, inténtalo más tarde.',
  },

  // About page
  about: {
    title: 'Sobre OnChess',
    mission: 'Nuestra Misión',
    story: 'Nuestra Historia',
    team: 'Nuestro Equipo',
    contact: 'Contáctanos',
    joinUs: 'Únete a Nosotros',
  },

  // Language selection
  language: {
    select: 'Seleccionar Idioma',
    en: 'Inglés',
    es: 'Español',
  },
};

export default spanishTranslations;
