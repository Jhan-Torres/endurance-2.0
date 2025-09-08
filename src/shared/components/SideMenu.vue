<template>
  <!-- Backdrop -->
  <div
    v-if="isSideMenuOpen"
    class="fixed inset-0 z-40 lg:hidden"
    @click="closeSideMenu"
  >
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
  </div>

  <!-- Side Menu -->
  <div
    :class="[
      'side-menu fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out',
      isSideMenuOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            class="w-full h-full text-primary-600 dark:text-primary-400"
            fill="currentColor"
          >
            <path
              d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
            />
            <path
              d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
              fill="white"
            />
          </svg>
        </div>
        <span class="text-lg font-bold text-gray-900 dark:text-white">
          Endurance
        </span>
      </div>

      <button
        @click="closeSideMenu"
        class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
      >
        <svg
          class="h-6 w-6"
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
    <nav class="mt-5 px-2">
      <div class="space-y-1">
        <router-link
          to="/passwords"
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-200"
          :class="
            $route.path === '/passwords'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
          "
          @click="closeSideMenu"
        >
          <svg
            class="mr-4 h-6 w-6 flex-shrink-0"
            :class="
              $route.path === '/passwords'
                ? 'text-primary-500 dark:text-primary-400'
                : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
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
          {{ isSpanish ? "Contraseñas" : "Passwords" }}
        </router-link>

        <router-link
          to="/notes"
          class="group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-200"
          :class="
            $route.path === '/notes'
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
          "
          @click="closeSideMenu"
        >
          <svg
            class="mr-4 h-6 w-6 flex-shrink-0"
            :class="
              $route.path === '/notes'
                ? 'text-primary-500 dark:text-primary-400'
                : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
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
          {{ isSpanish ? "Notas" : "Notes" }}
        </router-link>
      </div>
    </nav>

    <!-- Settings Section -->
    <div class="mt-6 px-2">
      <div class="space-y-1">
        <!-- Language Selector -->
        <div class="relative language-dropdown">
          <button
            @click="toggleLanguageDropdown"
            class="group flex items-center w-full px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <svg
              class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
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
              {{ isSpanish ? "Idioma" : "Language" }}
            </span>
            <span
              class="text-sm font-medium text-primary-600 dark:text-primary-400"
            >
              {{ isSpanish ? "ES" : "EN" }}
            </span>
            <svg
              class="ml-2 h-4 w-4 transform transition-transform duration-200"
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
          <div
            v-if="showLanguageDropdown"
            class="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-50"
          >
            <button
              @click="selectLanguage('en')"
              class="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-t-md"
              :class="{
                'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400':
                  !isSpanish,
              }"
            >
              <span
                class="mr-2 text-sm font-medium text-primary-600 dark:text-primary-400"
                >EN</span
              >
              English
              <svg
                v-if="!isSpanish"
                class="ml-auto h-4 w-4 text-primary-600 dark:text-primary-400"
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
              class="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-md"
              :class="{
                'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400':
                  isSpanish,
              }"
            >
              <span class="mr-2">🇪🇸</span>
              Español
              <svg
                v-if="isSpanish"
                class="ml-auto h-4 w-4 text-primary-600 dark:text-primary-400"
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
        <div
          class="group flex items-center w-full px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        >
          <svg
            v-if="isDark"
            class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
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
            class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
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
            {{ isSpanish ? "Modo Oscuro" : "Dark Mode" }}
          </span>

          <!-- Toggle Switch -->
          <button
            @click="toggleDarkMode"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            :class="isDark ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="isDark ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <!-- User Info & Logout -->
    <div
      class="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center justify-between">
        <button
          @click="goToProfile"
          class="flex items-center flex-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
        >
          <div class="flex-shrink-0">
            <div
              class="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center"
            >
              <svg
                class="h-5 w-5 text-primary-600 dark:text-primary-400"
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
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ user && user.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ user && user.email }}
            </p>
          </div>
        </button>

        <button
          @click="handleLogout"
          class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Logout"
        >
          <svg
            class="w-5 h-5"
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

const router = useRouter();
const { isSideMenuOpen, closeSideMenu } = useSideMenu();
const { isSpanish, setLanguage } = useLanguage();
const { isDark, toggleDarkMode } = useDarkMode();
const { user, logout } = useAuth();

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
  const hamburgerButton = target.closest(".hamburger-menu");
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
