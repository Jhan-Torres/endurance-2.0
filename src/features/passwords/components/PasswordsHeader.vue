<template>
  <header
    class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
  >
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
      Password Manager
    </h1>
    <button
      @click="$emit('add-password')"
      class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
      aria-label="Add new password"
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
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Add Password
    </button>
  </header>
</template>

<script setup lang="ts">
defineEmits<{
  "add-password": [];
}>();
</script>
