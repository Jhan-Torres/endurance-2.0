<template>
  <div class="text-center">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
      {{ isSignup ? "Create Account" : "Sign in to Endurance" }}
    </h2>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      {{
        isSignup
          ? "Join thousands of users securing their digital life"
          : "Access your secure password and notes vault"
      }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isSignup?: boolean;
}

withDefaults(defineProps<Props>(), {
  isSignup: false,
});
</script>
