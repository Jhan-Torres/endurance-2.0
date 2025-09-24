import { ref, computed } from "vue";
import { AuthService } from "../services/authService";
import type { User, LoginCredentials } from "../types/auth.types";

const authService = new AuthService();

// Global auth state
const user = ref<User | null>(null);
const loading = ref(false);

// Initialize auth state
const initializeAuth = () => {
  const storedUser = authService.getStoredUser();
  if (storedUser && authService.isAuthenticated()) {
    user.value = storedUser;
  } else {
    // Auto-login demo user for testing
    const demoUser: User = {
      id: "demo-user-id",
      email: "demo@endurance.app",
      name: "Demo User",
    };
    authService.setAuthToken("demo-token-" + Date.now());
    authService.setUser(demoUser);
    user.value = demoUser;
  }
};

export const useAuth = () => {
  const isAuthenticated = computed(() => !!user.value);

  const login = async (email: string, password: string): Promise<boolean> => {
    loading.value = true;
    try {
      const loggedInUser = await authService.login({ email, password });
      if (loggedInUser) {
        user.value = loggedInUser;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    authService.logout();
    user.value = null;
  };

  return {
    user: computed(() => user.value),
    isAuthenticated,
    loading: computed(() => loading.value),
    login,
    logout,
    initializeAuth,
  };
};
