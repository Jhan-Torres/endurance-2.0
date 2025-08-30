<template>
  <div class="min-h-screen">
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
                />
              </svg>
            </router-link>
            <router-link
              to="/notes"
              class="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transform hover:-translate-y-1 transition-all duration-300"
              aria-describedby="notes-description"
            >
              Plus: Organize Notes
            </router-link>
          </nav>
          <div id="get-started-description" class="sr-only">
            Navigate to password manager to begin securing your digital life
          </div>
          <div id="notes-description" class="sr-only">
            Access notes feature to organize additional information securely
          </div>

          <!-- Feature Preview Cards -->
          <section
            class="grid md:grid-cols-2 gap-8 mt-16 animate-slide-up max-w-4xl mx-auto"
            aria-labelledby="features-heading"
          >
            <h2 id="features-heading" class="sr-only">Main Features</h2>

            <article
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div
                class="text-5xl mb-6 animate-bounce-gentle"
                aria-hidden="true"
              >
                🔐
              </div>
              <header>
                <h3
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Military-Grade Password Security
                </h3>
              </header>
              <ul class="text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Generate cryptographically secure passwords
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Real-time password strength analysis & feedback
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Secure local storage - never leaves your device
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Lightning-fast search & instant copying
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Smart categorization & organization
                </li>
              </ul>
              <footer>
                <router-link
                  to="/passwords"
                  class="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                >
                  Start Securing Passwords →
                </router-link>
              </footer>
            </article>

            <article
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div
                class="text-5xl mb-6 animate-bounce-gentle"
                style="animation-delay: 0.2s"
                aria-hidden="true"
              >
                📝
              </div>
              <header>
                <h3
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Secure Notes & Information
                </h3>
              </header>
              <ul class="text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Store sensitive information securely
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Organize with tags & categories
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Quick search across all content
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-4 h-4 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Pin important notes for quick access
                </li>
              </ul>
              <footer>
                <router-link
                  to="/notes"
                  class="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                >
                  Secure Your Notes →
                </router-link>
              </footer>
            </article>
          </section>
        </header>
      </div>
    </section>

    <!-- Security Features Section -->
    <section
      class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
      aria-labelledby="security-features-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center mb-16">
          <h2
            id="security-features-heading"
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Enterprise-Grade Password Security
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your passwords deserve the highest level of protection. Our platform
            uses cutting-edge security practices to keep your credentials safe
            and accessible only to you.
          </p>
        </header>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <section aria-labelledby="security-benefits-heading">
            <h3 id="security-benefits-heading" class="sr-only">
              Security Benefits
            </h3>
            <ul class="space-y-8" role="list">
              <li class="flex items-start space-x-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
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
                  <h4
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Zero-Knowledge Architecture
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Your passwords are encrypted locally and never transmitted
                    to any server. Only you have access to your data, ensuring
                    complete privacy and security.
                  </p>
                </div>
              </li>

              <li class="flex items-start space-x-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h4
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Intelligent Password Generation
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Create truly random, unbreakable passwords with our advanced
                    generator. Customizable length, character sets, and
                    real-time strength analysis ensure maximum security.
                  </p>
                </div>
              </li>

              <li class="flex items-start space-x-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Smart Security Dashboard
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Monitor password health, track usage patterns, and get
                    instant access to your credentials with our intuitive
                    interface and smart search capabilities.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <aside class="relative" aria-label="Password manager preview">
            <div
              class="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
            >
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
                <div class="flex items-center space-x-3" aria-hidden="true">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div class="space-y-3" aria-hidden="true">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    >
                      G
                    </div>
                    <div class="flex-1">
                      <div
                        class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24 mb-1"
                      ></div>
                      <div
                        class="h-2 bg-gray-300 dark:bg-gray-500 rounded w-32"
                      ></div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    >
                      F
                    </div>
                    <div class="flex-1">
                      <div
                        class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-20 mb-1"
                      ></div>
                      <div
                        class="h-2 bg-gray-300 dark:bg-gray-500 rounded w-28"
                      ></div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    >
                      T
                    </div>
                    <div class="flex-1">
                      <div
                        class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-1"
                      ></div>
                      <div
                        class="h-2 bg-gray-300 dark:bg-gray-500 rounded w-24"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900"
      aria-labelledby="cta-heading"
    >
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <header>
          <h2
            id="cta-heading"
            class="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Take Control of Your Password Security Today
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join security-conscious users who have eliminated weak passwords and
            data breaches with our privacy-first password management solution.
          </p>
        </header>
        <router-link
          to="/passwords"
          class="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-gray-50"
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
            />
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Endurance landing page component focused on password management
</script>
