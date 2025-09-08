<template>
  <header
    class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
  >
    <nav
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      role="navigation"
      aria-label="Main navigation"
    >
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Hamburger Menu Button (only when logged in) -->
          <button
            v-if="isLoggedIn"
            @click="toggleSideMenu"
            class="hamburger-menu p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 mr-3"
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
            <!-- Website Icon -->
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
            <!-- Animated Title -->
            <span class="relative overflow-hidden">
              <span class="animated-text">Endurance</span>
            </span>
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Auth Buttons (when not authenticated) -->
          <div v-if="!isLoggedIn" class="flex items-center space-x-3">
            <button
              @click="openLoginModal"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {{ isSpanish ? "Iniciar Sesión" : "Sign In" }}
            </button>
            <button
              @click="openSignupModal"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              {{ isSpanish ? "Registrarse" : "Sign Up" }}
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
const { isSpanish } = useLanguage();
const { toggleSideMenu } = useSideMenu();
const { isAuthenticated: isLoggedIn, user, logout } = useAuth();
const { openLoginModal, openSignupModal } = useAuthModal();

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>

<style scoped>
.animated-text {
  background: linear-gradient(
    45deg,
    #3b82f6,
    #1d4ed8,
    #3730a3,
    #1e40af,
    #3b82f6
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.dark .animated-text {
  background: linear-gradient(
    45deg,
    #60a5fa,
    #3b82f6,
    #2563eb,
    #1d4ed8,
    #60a5fa
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
}
</style>
