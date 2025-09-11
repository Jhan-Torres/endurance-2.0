<template>
  <section class="py-section bg-white dark:bg-gray-800">
    <div class="container-responsive">
      <div class="text-center mb-16">
        <h2 class="text-heading-lg mb-4">Seamless Multi-Platform Experience</h2>
        <p class="text-body max-w-3xl mx-auto">
          Access your passwords anywhere, on any device. Our upcoming browser
          extension and mobile apps ensure your security follows you everywhere.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Platform Features -->
        <div class="space-y-8">
          <div class="flex items-start space-x-4">
            <div class="icon-container flex-shrink-0">
              <svg
                class="icon-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-heading-md mb-2">Web App</h3>
              <p class="text-body-sm">
                Full-featured web application accessible from any modern browser
                with offline capabilities.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="icon-container flex-shrink-0">
              <svg
                class="icon-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-heading-md mb-2">
                Mobile Apps
                <span class="text-primary-600 text-sm">(Coming Soon)</span>
              </h3>
              <p class="text-body-sm">
                Native iOS and Android apps with biometric authentication and
                secure auto-fill.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="icon-container flex-shrink-0">
              <svg
                class="icon-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-heading-md mb-2">
                Browser Extension
                <span class="text-primary-600 text-sm">(Coming Soon)</span>
              </h3>
              <p class="text-body-sm">
                One-click auto-fill for all your favorite websites. Works with
                Chrome, Firefox, Safari, and Edge.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="icon-container flex-shrink-0">
              <svg
                class="icon-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-heading-md mb-2">
                Desktop Apps
                <span class="text-primary-600 text-sm">(Coming Soon)</span>
              </h3>
              <p class="text-body-sm">
                Native Windows, macOS, and Linux applications with system-level
                integration.
              </p>
            </div>
          </div>
        </div>

        <!-- Platform Visual -->
        <div class="relative">
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12">
            <div class="grid grid-cols-2 gap-6">
              <!-- Desktop -->
              <div
                class="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300"
              >
                <div
                  class="flex items-center justify-center h-16 bg-white dark:bg-white rounded-lg mb-4"
                >
                  <svg
                    class="w-8 h-8 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p
                  class="text-sm font-medium text-gray-900 dark:text-white text-center"
                >
                  Desktop
                </p>
              </div>

              <!-- Mobile -->
              <div
                class="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300"
              >
                <div
                  class="flex items-center justify-center h-16 bg-white dark:bg-white rounded-lg mb-4"
                >
                  <svg
                    class="w-8 h-8 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p
                  class="text-sm font-medium text-gray-900 dark:text-white text-center"
                >
                  Mobile
                </p>
              </div>

              <!-- Browser -->
              <div
                class="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300"
              >
                <div
                  class="flex items-center justify-center h-16 bg-white dark:bg-white rounded-lg mb-4"
                >
                  <svg
                    class="w-8 h-8 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <p
                  class="text-sm font-medium text-gray-900 dark:text-white text-center"
                >
                  Browser
                </p>
              </div>

              <!-- Cloud Sync -->
              <div
                class="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300"
              >
                <div
                  class="flex items-center justify-center h-16 bg-white dark:bg-white rounded-lg mb-4"
                >
                  <svg
                    class="w-8 h-8 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
                <p
                  class="text-sm font-medium text-gray-900 dark:text-white text-center"
                >
                  Cloud Sync
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Multi-platform section component
</script>
