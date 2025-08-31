<template>
  <div v-if="loading" class="text-center py-8">
    <div
      class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
    ></div>
    <p class="mt-2 text-gray-600 dark:text-gray-400">Loading notes...</p>
  </div>

  <div v-else-if="notes.length === 0" class="text-center py-8">
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
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
      No notes found
    </h3>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {{
        searchTerm
          ? "Try adjusting your search terms."
          : "Get started by creating your first note."
      }}
    </p>
  </div>

  <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="note in notes"
      :key="note.id"
      class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex justify-between items-start mb-3">
        <h3
          class="text-lg font-semibold text-gray-900 dark:text-white truncate"
        >
          {{ note.title }}
        </h3>
        <div class="flex space-x-1 ml-2">
          <button
            @click="$emit('edit-note', note)"
            class="p-1 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            :aria-label="`Edit ${note.title}`"
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
            @click="$emit('delete-note', note.id)"
            class="p-1 text-gray-400 hover:text-red-600 transition-colors"
            :aria-label="`Delete ${note.title}`"
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

      <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
        {{ note.content }}
      </p>

      <div class="text-xs text-gray-500 dark:text-gray-400">
        {{ formatDate(note.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

interface Props {
  notes: Note[];
  loading: boolean;
  searchTerm: string;
}

defineProps<Props>();

defineEmits<{
  "edit-note": [note: Note];
  "delete-note": [id: string];
}>();

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
</script>
