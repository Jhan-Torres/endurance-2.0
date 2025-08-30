<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <AppHeader />

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" role="main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import AppHeader from "./shared/components/AppHeader.vue";
import { useAuth } from "./features/auth/composables/useAuth";

const { initializeAuth } = useAuth();

onMounted(() => {
  initializeAuth();
});
</script>
