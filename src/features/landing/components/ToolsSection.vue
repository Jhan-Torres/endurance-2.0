<template>
  <section
    class="py-section bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="container-responsive">
      <div class="text-center mb-16">
        <h2 class="text-heading-lg mb-4">Powerful Password Tools</h2>
        <p class="text-body max-w-3xl mx-auto">
          Generate, store, and manage passwords with advanced tools designed for
          both individuals and teams.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <!-- Password Generator Showcase -->
        <div class="order-2 lg:order-1">
          <div
            class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-heading-md">Password Generator</h3>
              <div class="icon-container">
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>

            <!-- Mock Password Generator UI -->
            <div class="space-y-4">
              <div
                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600"
              >
                <div class="flex items-center justify-between">
                  <span
                    class="font-mono text-lg text-gray-800 dark:text-gray-200"
                    >K9#mX@7wP3nQ</span
                  >
                  <button class="btn-ghost text-sm">Copy</button>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                    checked
                  />
                  <span class="text-gray-700 dark:text-gray-300"
                    >Uppercase</span
                  >
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                    checked
                  />
                  <span class="text-gray-700 dark:text-gray-300"
                    >Lowercase</span
                  >
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                    checked
                  />
                  <span class="text-gray-700 dark:text-gray-300">Numbers</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                    checked
                  />
                  <span class="text-gray-700 dark:text-gray-300">Symbols</span>
                </label>
              </div>

              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Length:</span
                >
                <div
                  class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2"
                >
                  <div
                    class="bg-primary-600 h-2 rounded-full"
                    style="width: 60%"
                  ></div>
                </div>
                <span
                  class="text-sm font-medium text-gray-800 dark:text-gray-200"
                  >12</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Password Tools Features -->
        <div class="order-1 lg:order-2 space-y-6">
          <h3 class="text-heading-lg">Advanced Password Management</h3>

          <div class="space-y-4">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  Secure Password Generation
                </h4>
                <p class="text-body-sm">
                  Create cryptographically secure passwords with customizable
                  length and character sets.
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  Password Strength Analysis
                </h4>
                <p class="text-body-sm">
                  Real-time analysis of password strength with suggestions for
                  improvement.
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  Breach Monitoring
                </h4>
                <p class="text-body-sm">
                  Automatic monitoring for data breaches and compromised
                  passwords with instant alerts.
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
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                  Import & Export
                </h4>
                <p class="text-body-sm">
                  Seamlessly migrate from other password managers with our
                  secure import tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div
            class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2"
          >
            256-bit
          </div>
          <div class="text-body-sm">AES Encryption</div>
        </div>
        <div class="text-center">
          <div
            class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2"
          >
            ∞
          </div>
          <div class="text-body-sm">Password Storage</div>
        </div>
        <div class="text-center">
          <div
            class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2"
          >
            24/7
          </div>
          <div class="text-body-sm">Sync & Access</div>
        </div>
        <div class="text-center">
          <div
            class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2"
          >
            100%
          </div>
          <div class="text-body-sm">Privacy Focused</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Password tools section component
</script>
