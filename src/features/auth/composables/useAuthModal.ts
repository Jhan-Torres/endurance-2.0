import { ref, watch } from "vue";
import { useBodyScroll } from "../../../shared/composables/useBodyScroll";

const isAuthModalOpen = ref(false);
const authModalMode = ref<"login" | "signup">("login");

export function useAuthModal() {
  const { addScrollBlocker, removeScrollBlocker } = useBodyScroll();

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

  // Watch for modal state changes and manage body scroll
  watch(isAuthModalOpen, (isOpen) => {
    if (isOpen) {
      addScrollBlocker("authmodal");
    } else {
      removeScrollBlocker("authmodal");
    }
  });

  return {
    isAuthModalOpen,
    authModalMode,
    openLoginModal,
    openSignupModal,
    closeAuthModal,
    toggleAuthMode,
  };
}
