<template>
  <div v-if="loading" class="text-center py-8">
    <div
      class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
    ></div>
    <p class="mt-2 text-gray-600 dark:text-gray-400">Loading passwords...</p>
  </div>

  <div v-else-if="passwords.length === 0" class="text-center py-8">
    <svg
      class="mx-auto h-12 w-12 text-gray-400"
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
    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
      No passwords found
    </h3>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {{
        searchTerm
          ? "Try adjusting your search terms."
          : "Get started by adding your first password."
      }}
    </p>
  </div>

  <div v-else class="grid gap-4">
    <div
      v-for="password in passwords"
      :key="password.id"
      class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex justify-between items-start">
        <div class="flex-1 min-w-0">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white truncate"
          >
            {{ password.website }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 truncate">
            {{ password.username }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Updated {{ formatDate(password.updatedAt) }}
          </p>
        </div>

        <div class="flex space-x-2 ml-4">
          <button
            @click="$emit('copy-password', password.id)"
            class="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            :aria-label="`Copy password for ${password.website}`"
          >
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>

          <button
            @click="$emit('edit-password', password)"
            class="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            :aria-label="`Edit password for ${password.website}`"
          >
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            @click="$emit('delete-password', password.id)"
            class="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            :aria-label="`Delete password for ${password.website}`"
          >
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Password {
  id: string;
  website: string;
  username: string;
  password: string;
  updatedAt: Date;
}

interface Props {
  passwords: Password[];
  loading: boolean;
  searchTerm: string;
}

defineProps<Props>();

defineEmits<{
  "copy-password": [id: string];
  "edit-password": [password: Password];
  "delete-password": [id: string];
}>();

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
</script>
