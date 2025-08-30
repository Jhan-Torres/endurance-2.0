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
          <router-link
            to="/"
            class="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
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

        <div class="flex items-center space-x-8">
          <!-- Navigation Links - Only show when authenticated -->
          <ul v-if="isLoggedIn" class="hidden sm:flex space-x-8" role="menubar">
            <li role="none">
              <router-link
                to="/passwords"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200"
                :class="
                  $route.path === '/passwords'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100'
                "
                role="menuitem"
                :aria-current="
                  $route.path === '/passwords' ? 'page' : undefined
                "
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Passwords
              </router-link>
            </li>
            <li role="none">
              <router-link
                to="/notes"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200"
                :class="
                  $route.path === '/notes'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100'
                "
                role="menuitem"
                :aria-current="$route.path === '/notes' ? 'page' : undefined"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Notes
              </router-link>
            </li>
          </ul>

          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            :aria-label="
              isDark ? 'Switch to light mode' : 'Switch to dark mode'
            "
          >
            <svg
              v-if="isDark"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>

          <!-- Login Button (when not authenticated) -->
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Sign In
          </router-link>

          <!-- User Menu -->
          <div v-if="isLoggedIn" class="flex items-center space-x-4">
            <span class="text-sm text-gray-600 dark:text-gray-300">{{
              user
            }}</span>
            <button
              @click="handleLogout"
              class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile menu -->
    <nav
      v-if="isLoggedIn"
      class="sm:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <ul
        class="pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
        role="menu"
      >
        <li role="none">
          <router-link
            to="/passwords"
            class="flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200"
            :class="
              $route.path === '/passwords'
                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-700 dark:text-primary-300'
                : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
            "
            role="menuitem"
            :aria-current="$route.path === '/passwords' ? 'page' : undefined"
          >
            <svg
              class="w-4 h-4 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Passwords
          </router-link>
        </li>
        <li role="none">
          <router-link
            to="/notes"
            class="flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200"
            :class="
              $route.path === '/notes'
                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-700 dark:text-primary-300'
                : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
            "
            role="menuitem"
            :aria-current="$route.path === '/notes' ? 'page' : undefined"
          >
            <svg
              class="w-4 h-4 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Notes
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useDarkMode } from "../composables/useDarkMode";
import { useAuth } from "../../features/auth/composables/useAuth";

const router = useRouter();
const { isDark, toggleDarkMode } = useDarkMode();
const { isAuthenticated: isLoggedIn, user, logout } = useAuth();

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
