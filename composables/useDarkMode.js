import { ref, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  // Update dark mode class on html element
  const updateDarkMode = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', dark ? 'dark' : 'light')
    isDark.value = dark
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    updateDarkMode(!isDark.value)
  }

  // Initialize dark mode from localStorage or system preference
  onMounted(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode) {
      updateDarkMode(savedMode === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      updateDarkMode(prefersDark)
    }
  })

  return {
    isDark,
    toggleDarkMode
  }
} 