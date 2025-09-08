import { ref } from "vue";

const isAuthModalOpen = ref(false);
const authModalMode = ref<"login" | "signup">("login");

export function useAuthModal() {
  const openLoginModal = () => {
    authModalMode.value = "login";
    isAuthModalOpen.value = true;
  };

  const openSignupModal = () => {
    authModalMode.value = "signup";
    isAuthModalOpen.value = true;
  };

  const closeAuthModal = () => {
    isAuthModalOpen.value = false;
  };

  const toggleAuthMode = () => {
    authModalMode.value = authModalMode.value === "login" ? "signup" : "login";
  };

  return {
    isAuthModalOpen,
    authModalMode,
    openLoginModal,
    openSignupModal,
    closeAuthModal,
    toggleAuthMode,
  };
}
