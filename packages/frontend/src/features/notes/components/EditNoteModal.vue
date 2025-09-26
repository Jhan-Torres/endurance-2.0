<template>
  <!-- Modal Backdrop -->
  <Transition
    name="backdrop"
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-gray-500 bg-opacity-75"
      @click="closeModal"
    />
  </Transition>

  <!-- Modal -->
  <Transition
    name="modal"
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-auto max-h-[85vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Note
          </h2>
          <button
            @click="closeModal"
            class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-4">
          <form @submit.prevent="handleSubmit" class="space-y-3">
            <!-- Title -->
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Title *
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                required
                class="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter note title"
              />
            </div>

            <!-- Content -->
            <div>
              <label
                for="content"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Content *
              </label>
              <textarea
                id="content"
                v-model="formData.content"
                required
                rows="5"
                class="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm resize-none"
                placeholder="Write your note content here..."
              />
            </div>

            <!-- Tags -->
            <div>
              <label
                for="tags"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Tags
              </label>
              <select
                id="tags"
                v-model="selectedTag"
                @change="addTag"
                class="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Select a tag to add</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="meeting">Meeting</option>
                <option value="development">Development</option>
                <option value="ideas">Ideas</option>
                <option value="important">Important</option>
                <option value="project">Project</option>
                <option value="research">Research</option>
                <option value="todo">To Do</option>
                <option value="finance">Finance</option>
                <option value="health">Health</option>
                <option value="travel">Travel</option>
              </select>
            </div>

            <!-- Display current tags -->
            <div
              v-if="formData.tags.length > 0"
              class="flex flex-wrap gap-1.5 mt-2"
            >
              <span
                v-for="tag in formData.tags"
                :key="tag"
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                @click="removeTag(tag)"
                :title="`Click to remove '${tag}' tag`"
              >
                {{ tag }}
                <svg
                  class="ml-1 w-2.5 h-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>

            <!-- Error message -->
            <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">
              {{ error }}
            </div>

            <!-- Modal Actions -->
            <div class="flex space-x-2 pt-3">
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 inline-flex justify-center items-center px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span
                  v-if="loading"
                  class="inline-block animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"
                ></span>
                {{ loading ? "Saving..." : "Save Changes" }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="px-3 py-1.5 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import type { Note } from "../model";

interface Props {
  isOpen: boolean;
  note: Note | null;
}

interface Emits {
  (e: "close"): void;
  (e: "save", note: Note): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const loading = ref(false);
const error = ref("");

// Form data
const formData = ref({
  title: "",
  content: "",
  tags: [] as string[],
});

const selectedTag = ref("");

// Body scroll lock functionality
const lockBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

const unlockBodyScroll = () => {
  document.body.style.overflow = "";
};

// Watch for modal open/close to manage body scroll
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      lockBodyScroll();
      if (props.note) {
        loadNoteData();
      }
    } else {
      unlockBodyScroll();
    }
  },
  { immediate: true }
);

// Watch for note changes
watch(
  () => props.note,
  (newNote) => {
    if (newNote && props.isOpen) {
      loadNoteData();
    }
  }
);

// Cleanup on component unmount
onUnmounted(() => {
  unlockBodyScroll();
});

// Load note data into form
const loadNoteData = () => {
  if (props.note) {
    formData.value = {
      title: props.note.title,
      content: props.note.content,
      tags: [...props.note.tags],
    };
  }
};

// Form functions
const resetForm = () => {
  formData.value = {
    title: "",
    content: "",
    tags: [],
  };
  selectedTag.value = "";
  error.value = "";
  loading.value = false;
};

const validateForm = (): boolean => {
  error.value = "";

  // Title validation
  if (!formData.value.title.trim()) {
    error.value = "Note title is required";
    return false;
  }

  if (formData.value.title.trim().length < 1) {
    error.value = "Note title cannot be empty";
    return false;
  }

  if (formData.value.title.trim().length > 100) {
    error.value = "Note title is too long (maximum 100 characters)";
    return false;
  }

  // Check for invalid characters in title
  const invalidTitleChars = /[<>:"\/\\|?*\x00-\x1f]/;
  if (invalidTitleChars.test(formData.value.title)) {
    error.value = "Note title contains invalid characters";
    return false;
  }

  // Content validation
  if (!formData.value.content.trim()) {
    error.value = "Note content is required";
    return false;
  }

  if (formData.value.content.trim().length < 1) {
    error.value = "Note content cannot be empty";
    return false;
  }

  if (formData.value.content.length > 10000) {
    error.value = "Note content is too long (maximum 10,000 characters)";
    return false;
  }

  // Tags validation
  if (formData.value.tags.length > 10) {
    error.value = "Too many tags (maximum 10 tags allowed)";
    return false;
  }

  // Validate individual tags
  for (const tag of formData.value.tags) {
    if (tag.length > 20) {
      error.value = `Tag "${tag}" is too long (maximum 20 characters per tag)`;
      return false;
    }

    if (tag.includes(" ")) {
      error.value = `Tag "${tag}" cannot contain spaces`;
      return false;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(tag)) {
      error.value = `Tag "${tag}" contains invalid characters (only letters, numbers, hyphens, and underscores allowed)`;
      return false;
    }
  }

  // Check for duplicate tags
  const uniqueTags = new Set(formData.value.tags);
  if (uniqueTags.size !== formData.value.tags.length) {
    error.value = "Duplicate tags are not allowed";
    return false;
  }

  return true;
};

const closeModal = () => {
  unlockBodyScroll();
  resetForm();
  emit("close");
};

// Add tag function for select dropdown
const addTag = () => {
  if (selectedTag.value && !formData.value.tags.includes(selectedTag.value)) {
    formData.value.tags.push(selectedTag.value);
    selectedTag.value = ""; // Reset selection
  }
};

// Remove tag function
const removeTag = (tagToRemove: string) => {
  formData.value.tags = formData.value.tags.filter(
    (tag) => tag !== tagToRemove
  );
};

const handleSubmit = async () => {
  if (!validateForm() || !props.note) return;

  loading.value = true;

  try {
    const updatedNote: Note = {
      ...props.note,
      title: formData.value.title.trim(),
      content: formData.value.content.trim(),
      tags: formData.value.tags,
      updatedAt: new Date(),
    };

    emit("save", updatedNote);
    closeModal();
  } catch (err) {
    error.value = "Failed to save note. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Custom transition for modal */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
