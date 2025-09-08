import { ref } from "vue";

const isSideMenuOpen = ref(false);

export function useSideMenu() {
  const openSideMenu = () => {
    isSideMenuOpen.value = true;
  };

  const closeSideMenu = () => {
    isSideMenuOpen.value = false;
  };

  const toggleSideMenu = () => {
    isSideMenuOpen.value = !isSideMenuOpen.value;
  };

  return {
    isSideMenuOpen,
    openSideMenu,
    closeSideMenu,
    toggleSideMenu,
  };
}
