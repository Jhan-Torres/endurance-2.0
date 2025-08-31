<template>
  <!-- Hero Section -->
  <section
    class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 sm:py-32"
    role="banner"
  >
    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:opacity-20"
      aria-hidden="true"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center animate-fade-in">
        <h1
          class="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          The Ultimate
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600"
          >
            Password Manager
          </span>
        </h1>
        <p
          class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Take control of your digital security with our advanced password
          management solution. Generate unbreakable passwords, store them
          securely, and access them instantly - all with military-grade
          encryption that keeps your data safe on your device.
        </p>

        <nav
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          aria-label="Hero actions"
        >
          <router-link
            to="/passwords"
            class="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            aria-describedby="get-started-description"
          >
            Secure My Passwords Now
            <svg
              class="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </router-link>

          <router-link
            to="/notes"
            class="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 border-2 border-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 text-primary-600 dark:text-primary-400 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Try Notes Manager
          </router-link>
        </nav>
      </header>
    </div>
  </section>
</template>

<script setup lang="ts">
// Hero section component for landing page
</script>
