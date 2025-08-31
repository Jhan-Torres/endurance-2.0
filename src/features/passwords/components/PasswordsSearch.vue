<template>
  <div class="relative" role="search">
    <label for="password-search" class="sr-only">Search passwords</label>
    <svg
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <input
      id="password-search"
      :value="searchTerm"
      @input="
        $emit('update:searchTerm', ($event.target as HTMLInputElement).value)
      "
      type="text"
      placeholder="Search passwords..."
      class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  searchTerm: string;
}

defineProps<Props>();

defineEmits<{
  "update:searchTerm": [value: string];
}>();
</script>
