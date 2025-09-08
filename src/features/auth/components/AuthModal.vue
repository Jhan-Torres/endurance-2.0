<template>
  <!-- Modal Backdrop -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Background overlay -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      @click="closeModal"
    ></div>

    <!-- Modal panel -->
    <div
      class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div
        class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6"
        @click.stop
      >
        <!-- Close button -->
        <div class="absolute right-0 top-0 pr-4 pt-4">
          <button
            type="button"
            class="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="closeModal"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Modal content -->
        <div class="sm:flex sm:items-start">
          <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
            <AuthHeader :is-signup="isSignup" />
            <div class="mt-6">
              <LoginForm
                :is-signup="isSignup"
                @toggle-mode="toggleAuthMode"
                @auth-success="handleAuthSuccess"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AuthHeader from "./AuthHeader.vue";
import LoginForm from "./LoginForm.vue";

interface Props {
  isOpen?: boolean;
  defaultMode?: "login" | "signup";
}

interface Emits {
  (e: "close"): void;
  (e: "auth-success"): void;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  defaultMode: "login",
});

const emit = defineEmits<Emits>();

const isSignup = ref(props.defaultMode === "signup");

// Reset mode when modal opens
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      isSignup.value = props.defaultMode === "signup";
    }
  }
);

const closeModal = () => {
  emit("close");
};

const toggleAuthMode = () => {
  isSignup.value = !isSignup.value;
};

const handleAuthSuccess = () => {
  emit("auth-success");
  closeModal();
};

// Close modal on escape key
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.isOpen) {
    closeModal();
  }
};

// Add/remove event listener for escape key
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }
);
</script>
