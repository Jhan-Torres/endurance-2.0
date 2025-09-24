<template>
  <div class="lg:col-span-1">
    <div
      class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-300"
    >
      <div class="flex flex-col items-center">
        <!-- Profile Avatar -->
        <div
          class="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            class="w-12 h-12 text-primary-600 dark:text-primary-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- User Info -->
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {{ userProfile.name }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-2">
          {{ userProfile.email }}
        </p>
        <span
          class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
          :class="getRoleBadgeClass(userProfile.role)"
        >
          {{ getRoleLabel(userProfile.role) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from "../../../shared/composables/useLanguage";

const { isSpanish } = useLanguage();

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  lastLogin: Date;
}

interface Props {
  userProfile: UserProfile;
}

defineProps<Props>();

// Helper functions
const getRoleLabel = (role: string) => {
  const labels = {
    admin: isSpanish.value ? "Administrador" : "Administrator",
    user: isSpanish.value ? "Usuario" : "User",
    guest: isSpanish.value ? "Invitado" : "Guest",
  };
  return labels[role as keyof typeof labels] || role;
};

const getRoleBadgeClass = (role: string) => {
  const classes = {
    admin:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    user: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    guest: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };
  return classes[role as keyof typeof classes] || classes.user;
};
</script>
