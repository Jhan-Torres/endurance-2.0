import { ref, computed } from "vue";

export type Language = "en" | "es";

const currentLanguage = ref<Language>("en");

export function useLanguage() {
  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang;
    localStorage.setItem("endurance_language", lang);
  };

  const initializeLanguage = () => {
    const savedLanguage = localStorage.getItem(
      "endurance_language"
    ) as Language;
    if (savedLanguage && ["en", "es"].includes(savedLanguage)) {
      currentLanguage.value = savedLanguage;
    }
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage.value === "en" ? "es" : "en");
  };

  const isSpanish = computed(() => currentLanguage.value === "es");
  const isEnglish = computed(() => currentLanguage.value === "en");

  return {
    currentLanguage,
    isSpanish,
    isEnglish,
    setLanguage,
    toggleLanguage,
    initializeLanguage,
  };
}
