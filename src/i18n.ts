import { createI18n } from "vue-i18n";

const messages = {
  en: {
    nav: {
      home: "Home",
      logins: "Logins",
      notes: "Notes",
      signIn: "Sign In",
      signUp: "Sign Up",
      language: "Language",
      languageCode: "EN",
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
    common: {
      cancel: "Cancel",
      save: "Save",
      saveChanges: "Save Changes",
      saving: "Saving...",
      edit: "Edit",
    },
    profile: {
      title: "User Profile",
      description: "Manage your personal information and account settings",
      accountInfo: "Account Information",
      editInformation: "Edit Information",
      fullName: "Full Name",
      email: "Email Address",
      memberSince: "Member Since",
      lastLogin: "Last Login",
      security: "Security",
      passwordChange: "Want to change your password?",
      passwordChangeDesc: "We'll send you a reset link via email",
      requestChange: "Request Change",
      profileSaved: "Profile saved successfully",
      passwordResetSent:
        "A password reset link has been sent to your email address",
      roles: {
        admin: "Administrator",
        user: "User",
        guest: "Guest",
      },
    },
  },
  es: {
    nav: {
      home: "Inicio",
      logins: "Inicios de Sesión",
      notes: "Notas",
      signIn: "Iniciar Sesión",
      signUp: "Registrarse",
      language: "Idioma",
      languageCode: "ES",
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
    common: {
      cancel: "Cancelar",
      save: "Guardar",
      saveChanges: "Guardar Cambios",
      saving: "Guardando...",
      edit: "Editar",
    },
    profile: {
      title: "Perfil de Usuario",
      description:
        "Administra tu información personal y configuración de cuenta",
      accountInfo: "Información de Cuenta",
      editInformation: "Editar Información",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      memberSince: "Fecha de Registro",
      lastLogin: "Último Acceso",
      security: "Seguridad",
      passwordChange: "¿Deseas cambiar tu contraseña?",
      passwordChangeDesc:
        "Te enviaremos un enlace de restablecimiento por correo",
      requestChange: "Solicitar Cambio",
      profileSaved: "Perfil guardado exitosamente",
      passwordResetSent:
        "Se ha enviado un enlace de restablecimiento a tu correo electrónico",
      roles: {
        admin: "Administrador",
        user: "Usuario",
        guest: "Invitado",
      },
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
