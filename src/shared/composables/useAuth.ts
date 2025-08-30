import { ref, computed } from "vue";

const isAuthenticated = ref(false);
const currentUser = ref<string | null>(null);

export function useAuth() {
  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simple authentication simulation
      // In a real app, this would call an authentication service
      setTimeout(() => {
        if (email && password) {
          isAuthenticated.value = true;
          currentUser.value = email;
          localStorage.setItem("endurance_auth", "true");
          localStorage.setItem("endurance_user", email);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    isAuthenticated.value = false;
    currentUser.value = null;
    localStorage.removeItem("endurance_auth");
    localStorage.removeItem("endurance_user");
  };

  const checkAuthStatus = () => {
    const authStatus = localStorage.getItem("endurance_auth");
    const user = localStorage.getItem("endurance_user");
    if (authStatus === "true" && user) {
      isAuthenticated.value = true;
      currentUser.value = user;
    }
  };

  const isLoggedIn = computed(() => isAuthenticated.value);
  const user = computed(() => currentUser.value);

  return {
    isLoggedIn,
    user,
    login,
    logout,
    checkAuthStatus,
  };
}
