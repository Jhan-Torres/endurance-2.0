import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

export type Language = "en" | "es";

export function useLanguage() {
  const { locale, t } = useI18n();

  const setLanguage = (lang: Language) => {
    locale.value = lang;
    localStorage.setItem("endurance_language", lang);
  };

  const initializeLanguage = () => {
    const savedLanguage = localStorage.getItem(
      "endurance_language"
    ) as Language;
    if (savedLanguage && ["en", "es"].includes(savedLanguage)) {
      locale.value = savedLanguage;
    }
  };

  const toggleLanguage = () => {
    setLanguage(locale.value === "en" ? "es" : "en");
  };

  const isSpanish = computed(() => locale.value === "es");
  const isEnglish = computed(() => locale.value === "en");
  const currentLanguage = computed(() => locale.value as Language);

  return {
    currentLanguage,
    isSpanish,
    isEnglish,
    setLanguage,
    toggleLanguage,
    initializeLanguage,
    t, // Export the translation function
  };
}
