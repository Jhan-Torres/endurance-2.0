import { ref, onMounted, watch } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  const setDarkMode = (dark: boolean) => {
    isDark.value = dark
  }

  // Watch for changes and update the document class and localStorage
  watch(isDark, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, { immediate: true })

  // Initialize dark mode from localStorage on mount
  onMounted(() => {
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) {
      // Use stored preference
      isDark.value = stored === 'true'
    } else {
      // Check system preference if no stored preference exists
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      // Store the initial preference
      localStorage.setItem('darkMode', prefersDark.toString())
    }
  })

  return {
    isDark,
    toggleDarkMode,
    setDarkMode
  }
}