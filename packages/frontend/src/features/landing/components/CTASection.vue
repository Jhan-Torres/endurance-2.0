<template>
  <section class="py-section bg-white dark:bg-gray-800">
    <div class="container-responsive text-center">
      <div class="max-w-4xl mx-auto">
        <h2
          class="text-4xl font-bold mb-6 sm:text-5xl text-gray-900 dark:text-white"
        >
          Ready to Secure Your Digital Life?
        </h2>
        <p
          class="text-xl mb-8 text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          Join thousands of users who trust Endurance to protect their passwords
          and sensitive data. Start your secure journey today with our free
          plan.
        </p>

        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button
            @click="handleGetStarted"
            class="btn-hero bg-primary-600 text-white hover:bg-primary-700 shadow-lg"
          >
            <svg
              class="w-5 h-5 mr-2"
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
            Get Started Free
          </button>
          <button
            @click="scrollToFeatures"
            class="btn-secondary bg-transparent border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400 dark:hover:text-gray-900"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            Learn More
          </button>
        </div>

        <!-- Trust Indicators -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-90">
          <div class="flex items-center justify-center space-x-3">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span class="text-gray-700 dark:text-gray-300"
              >Zero-Knowledge Security</span
            >
          </div>
          <div class="flex items-center justify-center space-x-3">
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
            <span class="text-gray-700 dark:text-gray-300"
              >Military-Grade Encryption</span
            >
          </div>
          <div class="flex items-center justify-center space-x-3">
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span class="text-gray-700 dark:text-gray-300"
              >Instant Cloud Sync</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthModal } from "../../auth/composables/useAuthModal";

const { openSignupModal } = useAuthModal();

const handleGetStarted = () => {
  openSignupModal();
};

const scrollToFeatures = () => {
  const featuresSection = document.querySelector("#features");
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: "smooth" });
  } else {
    // Fallback: scroll to top to see features
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>
