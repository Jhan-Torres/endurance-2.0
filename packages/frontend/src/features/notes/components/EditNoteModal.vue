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
            <FormInput
              id="title"
              label="Title *"
              type="text"
              v-model="formData.title"
              :error="getFieldError('title')"
              placeholder="Enter note title"
            />

            <!-- Content -->
            <FormInput
              id="content"
              label="Content *"
              type="textarea"
              v-model="formData.content"
              :error="getFieldError('content')"
              placeholder="Write your note content here..."
              :rows="5"
            />

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
            <div
              v-if="submitError"
              class="text-red-600 dark:text-red-400 text-sm"
            >
              {{ submitError }}
            </div>

            <!-- Modal Actions -->
            <div class="flex space-x-2 pt-3">
              <button
                type="submit"
                :disabled="loading || !isValid"
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
import { useFormValidation } from "../../../shared/composables/useFormValidation";
import { noteModalSchema } from "../../../shared/validation/schemas";
import FormInput from "../../../shared/components/FormInput.vue";

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
const submitError = ref("");
const selectedTag = ref("");

// Form data
const formData = ref({
  title: "",
  content: "",
  tags: [] as string[],
});

// Use our validation composable
const {
  formData: validationFormData,
  errors,
  validateField,
  validateAll,
  isValid,
} = useFormValidation(noteModalSchema);

// Helper function to get field errors
const getFieldError = (field: string) => errors[field];

// Watch form data changes to trigger validation
watch(
  () => formData.value.title,
  (newValue) => {
    validationFormData.title = newValue;
    validateField("title", newValue);
  }
);

watch(
  () => formData.value.content,
  (newValue) => {
    validationFormData.content = newValue;
    validateField("content", newValue);
  }
);

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
  submitError.value = "";
  loading.value = false;
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
  if (!validateAll() || !props.note) return;

  loading.value = true;
  submitError.value = "";

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
    submitError.value = "Failed to save note. Please try again.";
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
