import { ref, computed } from "vue";

// Simple authentication state management
const isAuthenticated = ref(false);
const userEmail = ref("");

export function useAuth() {
  const login = (email: string, password: string): boolean => {
    // Simple demo authentication - in real app, this would validate against a backend
    if (email && password.length >= 6) {
      isAuthenticated.value = true;
      userEmail.value = email;
      localStorage.setItem(
        "endurance_auth",
        JSON.stringify({
          authenticated: true,
          email,
          timestamp: Date.now(),
        })
      );
      return true;
    }
    return false;
  };

  const logout = () => {
    isAuthenticated.value = false;
    userEmail.value = "";
    localStorage.removeItem("endurance_auth");
  };

  const checkAuthState = () => {
    const stored = localStorage.getItem("endurance_auth");
    if (stored) {
      try {
        const auth = JSON.parse(stored);
        // Check if auth is still valid (less than 24 hours old)
        const dayInMs = 24 * 60 * 60 * 1000;
        if (auth.authenticated && Date.now() - auth.timestamp < dayInMs) {
          isAuthenticated.value = true;
          userEmail.value = auth.email;
        } else {
          logout(); // Clear expired auth
        }
      } catch {
        logout(); // Clear invalid auth data
      }
    }
  };

  // Initialize auth state
  checkAuthState();

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    userEmail: computed(() => userEmail.value),
    login,
    logout,
    checkAuthState,
  };
}
