import { ref, onMounted, watch } from "vue";

const isDark = ref(false);

export function useDarkMode() {
  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const setDarkMode = (value: boolean) => {
    isDark.value = value;
    updateTheme();
  };

  const updateTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("endurance_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("endurance_theme", "light");
    }
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem("endurance_theme");

    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      // Check system preference
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    updateTheme();
  };

  onMounted(() => {
    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("endurance_theme")) {
        isDark.value = e.matches;
        updateTheme();
      }
    };

    mediaQuery.addListener(handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  });

  return {
    isDark,
    toggleDarkMode,
    setDarkMode,
  };
}
