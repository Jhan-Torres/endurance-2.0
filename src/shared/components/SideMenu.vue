<template>
  <!-- Backdrop -->
  <div v-if="isSideMenuOpen" class="backdrop" @click="closeSideMenu">
    <div class="backdrop-overlay" />
  </div>

  <!-- Side Menu -->
  <div
    :class="[
      'side-menu sidemenu-container',
      isSideMenuOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- Header -->
    <div class="sidemenu-header">
      <div class="flex items-center space-x-2">
        <div class="icon-container-sm">
          <svg viewBox="0 0 24 24" class="icon-primary" fill="currentColor">
            <path
              d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
            />
            <path
              d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
              fill="white"
            />
          </svg>
        </div>
        <span class="text-heading-md text-foreground"> Endurance </span>
      </div>

      <button @click="closeSideMenu" class="btn-close">
        <svg
          class="icon-sm"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="sidemenu-nav">
      <!-- Authenticated Navigation -->
      <div v-if="user" class="space-y-1">
        <router-link
          to="/passwords"
          class="group nav-link"
          :class="
            $route.path === '/passwords'
              ? 'nav-link-active'
              : 'nav-link-inactive'
          "
          @click="closeSideMenu"
        >
          <svg
            class="nav-icon"
            :class="
              $route.path === '/passwords'
                ? 'nav-icon-active'
                : 'nav-icon-inactive'
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          {{ t("nav.passwords") }}
        </router-link>

        <router-link
          to="/notes"
          class="group nav-link"
          :class="
            $route.path === '/notes' ? 'nav-link-active' : 'nav-link-inactive'
          "
          @click="closeSideMenu"
        >
          <svg
            class="nav-icon"
            :class="
              $route.path === '/notes' ? 'nav-icon-active' : 'nav-icon-inactive'
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          {{ t("nav.notes") }}
        </router-link>
      </div>

      <!-- Non-authenticated Navigation -->
      <div v-else class="space-y-1">
        <router-link
          to="/"
          class="group nav-link"
          :class="$route.path === '/' ? 'nav-link-active' : 'nav-link-inactive'"
          @click="closeSideMenu"
        >
          <svg
            class="nav-icon"
            :class="
              $route.path === '/' ? 'nav-icon-active' : 'nav-icon-inactive'
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {{ t("nav.home") }}
        </router-link>

        <div class="h-px bg-gray-200 dark:bg-gray-700 my-4" />

        <!-- Auth Actions for non-authenticated users -->
        <button
          @click="openLoginModal"
          class="group nav-link nav-link-inactive w-full text-left"
        >
          <svg
            class="nav-icon nav-icon-inactive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          {{ t("nav.signIn") }}
        </button>

        <button
          @click="openSignupModal"
          class="group nav-link nav-link-inactive w-full text-left"
        >
          <svg
            class="nav-icon nav-icon-inactive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          {{ t("nav.signUp") }}
        </button>
      </div>
    </nav>

    <!-- Settings Section -->
    <div class="sidemenu-settings">
      <div class="space-y-1">
        <!-- Language Selector -->
        <div class="relative language-dropdown">
          <button @click="toggleLanguageDropdown" class="group settings-button">
            <svg
              class="settings-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <span class="flex-1 text-left">
              {{ t("nav.language") }}
            </span>
            <span
              class="text-sm font-medium text-primary-600 dark:text-primary-400"
            >
              {{ isSpanish ? "ES" : "EN" }}
            </span>
            <svg
              class="dropdown-arrow"
              :class="{ 'rotate-180': showLanguageDropdown }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div v-if="showLanguageDropdown" class="dropdown-menu">
            <button
              @click="selectLanguage('en')"
              class="dropdown-item dropdown-item-top"
              :class="{
                'dropdown-item-active': !isSpanish,
              }"
            >
              <span
                class="mr-2 text-sm font-medium text-primary-600 dark:text-primary-400"
                >EN</span
              >
              English
              <svg
                v-if="!isSpanish"
                class="dropdown-checkmark"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              @click="selectLanguage('es')"
              class="dropdown-item dropdown-item-bottom"
              :class="{
                'dropdown-item-active': isSpanish,
              }"
            >
              <span class="mr-2">🇪🇸</span>
              Español
              <svg
                v-if="isSpanish"
                class="dropdown-checkmark"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Dark Mode Toggle -->
        <div class="group settings-button">
          <svg
            v-if="isDark"
            class="settings-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            class="settings-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <span class="flex-1 text-left">
            {{ t("settings.darkMode") }}
          </span>

          <!-- Toggle Switch -->
          <button
            @click="toggleDarkMode"
            class="toggle-switch"
            :class="isDark ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'"
          >
            <span
              class="toggle-thumb"
              :class="isDark ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <!-- User Info & Logout (only for authenticated users) -->
    <div v-if="user" class="sidemenu-footer">
      <div class="flex items-center justify-between">
        <button @click="goToProfile" class="user-profile-button">
          <div class="flex-shrink-0">
            <div class="user-avatar">
              <svg
                class="user-avatar-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="ml-3 text-left">
            <p class="user-name">
              {{ user && user.name }}
            </p>
            <p class="user-email">
              {{ user && user.email }}
            </p>
          </div>
        </button>

        <button @click="handleLogout" class="logout-button" title="Logout">
          <svg
            class="icon-sm"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useSideMenu } from "../composables/useSideMenu";
import { useLanguage } from "../composables/useLanguage";
import { useDarkMode } from "../composables/useDarkMode";
import { useAuth } from "../../features/auth/composables/useAuth";
import { useAuthModal } from "../../features/auth/composables/useAuthModal";

const router = useRouter();
const { isSideMenuOpen, closeSideMenu } = useSideMenu();
const { isSpanish, setLanguage, t } = useLanguage();
const { isDark, toggleDarkMode } = useDarkMode();
const { user, logout } = useAuth();
const { openLoginModal, openSignupModal } = useAuthModal();

// Language dropdown state
const showLanguageDropdown = ref(false);

const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value;
};

const selectLanguage = (lang: "en" | "es") => {
  setLanguage(lang);
  showLanguageDropdown.value = false;
};

// Close dropdown and side menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element;

  // Close language dropdown if clicking outside
  const languageDropdown = target.closest(".language-dropdown");
  if (!languageDropdown && showLanguageDropdown.value) {
    showLanguageDropdown.value = false;
  }

  // Close side menu if clicking outside (only on desktop)
  const sideMenu = target.closest(".side-menu");
  const hamburgerButton = target.closest(".hamburger-btn");
  if (
    !sideMenu &&
    !hamburgerButton &&
    isSideMenuOpen &&
    window.innerWidth >= 1024
  ) {
    closeSideMenu();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const handleLogout = () => {
  logout();
  closeSideMenu();
  router.push("/");
};

const goToProfile = () => {
  closeSideMenu();
  router.push("/profile");
};
</script>
