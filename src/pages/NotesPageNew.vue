<template>
  <div class="space-y-6">
    <header
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
    >
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Notes</h1>
      <button
        @click="showForm = true"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
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
        Add Note
      </button>
    </header>

    <!-- Search Bar -->
    <div class="relative">
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
        v-model="searchTerm"
        type="text"
        placeholder="Search notes..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>

    <!-- Notes List -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
      ></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Loading notes...</p>
    </div>

    <div v-else-if="filteredNotes.length === 0" class="text-center py-8">
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
        v-for="note in filteredNotes"
        :key="note.id"
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-start justify-between mb-2">
          <h3
            class="text-lg font-medium text-gray-900 dark:text-white truncate"
          >
            {{ note.title }}
          </h3>
          <div class="flex items-center space-x-1 ml-2">
            <button
              @click="editNote(note)"
              class="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              title="Edit note"
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
              @click="confirmDelete(note)"
              class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              title="Delete note"
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

        <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
          {{ note.content || "No content" }}
        </p>

        <div
          v-if="note.tags && note.tags.length > 0"
          class="flex flex-wrap gap-1 mb-2"
        >
          <span
            v-for="tag in note.tags"
            :key="tag"
            class="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <p class="text-xs text-gray-400 dark:text-gray-500">
          {{ formatDate(note.updatedAt) }}
        </p>
      </div>
    </div>

    <!-- Note Form Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeForm"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {{ editingNote ? "Edit Note" : "Add New Note" }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Title</label
            >
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter note title"
            />
          </div>

          <div>
            <label
              for="content"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Content</label
            >
            <textarea
              id="content"
              v-model="form.content"
              rows="10"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Write your note content here..."
            ></textarea>
          </div>

          <div>
            <label
              for="tags"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >Tags (optional)</label
            >
            <input
              id="tags"
              v-model="tagsInput"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter tags separated by commas (e.g. work, ideas, important)"
            />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Separate multiple tags with commas
            </p>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeForm"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {{ editingNote ? "Update" : "Add" }} Note
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useNotes } from "../features/notes/composables/useNotes";
import type { Note } from "../features/notes/types/note.types";

const {
  notes,
  loading,
  loadNotes,
  addNote,
  updateNote,
  deleteNote,
  searchNotes,
} = useNotes();

const showForm = ref(false);
const editingNote = ref<Note | null>(null);
const searchTerm = ref("");
const tagsInput = ref("");

const form = ref({
  title: "",
  content: "",
  tags: [] as string[],
});

const filteredNotes = computed(() => {
  return searchNotes(searchTerm.value);
});

onMounted(() => {
  loadNotes();
});

const handleSubmit = () => {
  // Parse tags from input
  const tags = tagsInput.value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const noteData = {
    title: form.value.title,
    content: form.value.content,
    tags: tags.length > 0 ? tags : undefined,
  };

  if (editingNote.value) {
    updateNote(editingNote.value.id, noteData);
  } else {
    addNote(noteData);
  }
  closeForm();
};

const editNote = (note: Note) => {
  editingNote.value = note;
  form.value = {
    title: note.title,
    content: note.content,
    tags: note.tags || [],
  };
  tagsInput.value = note.tags ? note.tags.join(", ") : "";
  showForm.value = true;
};

const confirmDelete = (note: Note) => {
  if (confirm(`Are you sure you want to delete "${note.title}"?`)) {
    deleteNote(note.id);
  }
};

const closeForm = () => {
  showForm.value = false;
  editingNote.value = null;
  form.value = {
    title: "",
    content: "",
    tags: [],
  };
  tagsInput.value = "";
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
