import { ref, watch } from "vue";
import { useBodyScroll } from "./useBodyScroll";

const isSideMenuOpen = ref(false);

export function useSideMenu() {
  const { addScrollBlocker, removeScrollBlocker } = useBodyScroll();

  const openSideMenu = () => {
    isSideMenuOpen.value = true;
  };

  const closeSideMenu = () => {
    isSideMenuOpen.value = false;
  };

  const toggleSideMenu = () => {
    isSideMenuOpen.value = !isSideMenuOpen.value;
  };

  // Watch for side menu state changes and manage body scroll
  watch(isSideMenuOpen, (isOpen) => {
    if (isOpen) {
      addScrollBlocker("sidemenu");
    } else {
      removeScrollBlocker("sidemenu");
    }
  });

  return {
    isSideMenuOpen,
    openSideMenu,
    closeSideMenu,
    toggleSideMenu,
  };
}
