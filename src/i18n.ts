import { createI18n } from "vue-i18n";

const messages = {
  en: {
    nav: {
      home: "Home",
      passwords: "Passwords",
      notes: "Notes",
      signIn: "Sign In",
      signUp: "Sign Up",
      language: "Language",
    },
    hero: {
      title: "The Ultimate",
      subtitle: "Password Manager",
      description:
        "Generate, store and manage all your passwords securely with military-grade encryption. Everything stays on your device, no external access.",
      getStarted: "Get Started Free",
      getStartedDescription:
        "Create your free account and start securing your passwords today",
    },
    settings: {
      darkMode: "Dark Mode",
    },
    profile: {
      title: "User Profile",
      description: "Manage your account settings and security preferences",
      logins: "Logins",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      passwords: "Contraseñas",
      notes: "Notas",
      signIn: "Iniciar Sesión",
      signUp: "Registrarse",
      language: "Idioma",
    },
    hero: {
      title: "El Mejor",
      subtitle: "Gestor de Contraseñas",
      description:
        "Genera, almacena y gestiona todas tus contraseñas de forma segura con cifrado militar. Todo en tu dispositivo, sin acceso externo.",
      getStarted: "Comenzar Gratis",
      getStartedDescription:
        "Crea tu cuenta gratuita y comienza a proteger tus contraseñas hoy",
    },
    settings: {
      darkMode: "Modo Oscuro",
    },
    profile: {
      title: "Perfil de Usuario",
      description:
        "Gestiona la configuración de tu cuenta y preferencias de seguridad",
      logins: "Inicios de Sesión",
    },
  },
};

// Get saved language or default to English
const getDefaultLocale = (): string => {
  const savedLanguage = localStorage.getItem("endurance_language");
  if (savedLanguage && ["en", "es"].includes(savedLanguage)) {
    return savedLanguage;
  }
  return "en";
};

export const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: "en",
  messages,
});

export default i18n;
