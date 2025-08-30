<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div
          class="w-16 h-16 mx-auto mb-4 p-3 bg-primary-100 dark:bg-primary-900 rounded-full"
        >
          <svg
            class="w-full h-full text-primary-600 dark:text-primary-400"
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
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Sign in to Endurance
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Access your secure password and notes vault
        </p>
      </div>

      <LoginForm />

      <div class="text-center">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Your data is stored locally and encrypted for security
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "../../shared/components/LoginForm.vue";
</script>
