<template>
  <header
    class="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95"
  >
    <nav
      class="container-responsive"
      role="navigation"
      aria-label="Main navigation"
    >
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Hamburger Menu Button -->
          <button
            @click="toggleSideMenu"
            class="hamburger-btn mr-3"
            aria-label="Open menu"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <router-link
            to="/"
            class="flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <!-- Security Shield Icon -->
            <div class="w-8 h-8 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                class="w-full h-full text-primary-600 dark:text-primary-400"
                fill="currentColor"
              >
                <path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
                />
              </svg>
            </div>
            <!-- Animated Title with Movement Background -->
            <span class="relative overflow-hidden">
              <span class="animated-text">Endurance</span>
            </span>
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Auth Buttons (when not authenticated) -->
          <div v-if="!isLoggedIn" class="flex items-center space-x-3">
            <button @click="openLoginModal" class="btn-ghost">
              {{ t("nav.signIn") }}
            </button>
            <button @click="openSignupModal" class="btn-primary">
              {{ t("nav.signUp") }}
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSideMenu } from "../composables/useSideMenu";
import { useLanguage } from "../composables/useLanguage";
import { useAuth } from "../../features/auth/composables/useAuth";
import { useAuthModal } from "../../features/auth/composables/useAuthModal";

const router = useRouter();
const { t } = useLanguage();
const { toggleSideMenu } = useSideMenu();
const { isAuthenticated: isLoggedIn, user, logout } = useAuth();
const { openLoginModal, openSignupModal } = useAuthModal();

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>
