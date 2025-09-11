<template>
  <footer class="bg-gray-900 dark:bg-black text-white">
    <div class="container-responsive py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-2 mb-6">
            <div class="w-8 h-8 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                class="w-full h-full text-primary-400"
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
            <span class="text-xl font-bold">Endurance</span>
          </div>
          <p class="text-gray-400 mb-6 leading-relaxed">
            The ultimate password manager with enterprise-grade security and
            privacy-first approach.
          </p>
          <div class="flex space-x-4">
            <!-- Facebook -->
            <a
              href="#"
              class="text-gray-400 hover:text-primary-400 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <!-- Instagram -->
            <a
              href="#"
              class="text-gray-400 hover:text-primary-400 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.017 0C8.396 0 7.989.013 6.772.072 5.557.132 4.738.333 4.019.63c-.738.292-1.365.68-1.987 1.301C1.413 2.553 1.025 3.18.733 3.918c-.297.719-.498 1.538-.558 2.753C.075 7.989.062 8.396.062 12.017c0 3.622.013 4.029.072 5.246.06 1.215.261 2.034.558 2.753.292.738.68 1.365 1.301 1.987.621.621 1.248 1.009 1.987 1.301.719.297 1.538.498 2.753.558 1.217.059 1.624.072 5.246.072 3.622 0 4.029-.013 5.246-.072 1.215-.06 2.034-.261 2.753-.558.738-.292 1.365-.68 1.987-1.301.621-.621 1.009-1.248 1.301-1.987.297-.719.498-1.538.558-2.753.059-1.217.072-1.624.072-5.246 0-3.622-.013-4.029-.072-5.246-.06-1.215-.261-2.034-.558-2.753-.292-.738-.68-1.365-1.301-1.987-.621-.621-1.248-1.009-1.987-1.301-.719-.297-1.538-.498-2.753-.558C16.046.013 15.639 0 12.017 0zM12.017 2.18c3.556 0 3.98.015 5.38.074 1.3.059 2.004.277 2.474.459.622.242 1.066.532 1.532.998.466.466.756.91.998 1.532.182.47.4 1.174.459 2.474.059 1.4.074 1.824.074 5.38 0 3.556-.015 3.98-.074 5.38-.059 1.3-.277 2.004-.459 2.474-.242.622-.532 1.066-.998 1.532-.466.466-.91.756-1.532.998-.47.182-1.174.4-2.474.459-1.4.059-1.824.074-5.38.074-3.556 0-3.98-.015-5.38-.074-1.3-.059-2.004-.277-2.474-.459-.622-.242-1.066-.532-1.532-.998-.466-.466-.756-.91-.998-1.532-.182-.47-.4-1.174-.459-2.474-.059-1.4-.074-1.824-.074-5.38 0-3.556.015-3.98.074-5.38.059-1.3.277-2.004.459-2.474.242-.622.532-1.066.998-1.532.466-.466.91-.756 1.532-.998.47-.182 1.174-.4 2.474-.459 1.4-.059 1.824-.074 5.38-.074zm0 3.707c-3.707 0-6.707 3-6.707 6.707s3 6.707 6.707 6.707 6.707-3 6.707-6.707-3-6.707-6.707-6.707zm0 11.058c-2.399 0-4.351-1.952-4.351-4.351s1.952-4.351 4.351-4.351 4.351 1.952 4.351 4.351-1.952 4.351-4.351 4.351zm8.532-11.313c0-.866-.702-1.568-1.568-1.568s-1.568.702-1.568 1.568.702 1.568 1.568 1.568 1.568-.702 1.568-1.568z"
                />
              </svg>
            </a>
            <!-- GitHub -->
            <a
              href="#"
              class="text-gray-400 hover:text-primary-400 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Product Links -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Product</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Features</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Security</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Pricing</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Browser Extension</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Mobile Apps</a
              >
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Support</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Help Center</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Contact Us</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Documentation</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >API Reference</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Status Page</a
              >
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h3 class="font-semibold text-lg mb-4">Company</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Blog</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Careers</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Terms of Service</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Endurance. All rights reserved.
          </div>
          <div class="flex items-center space-x-6 text-sm text-gray-400">
            <a href="#" class="hover:text-white transition-colors">Privacy</a>
            <a href="#" class="hover:text-white transition-colors">Terms</a>
            <a href="#" class="hover:text-white transition-colors">Cookies</a>
            <div class="flex items-center space-x-2">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>
