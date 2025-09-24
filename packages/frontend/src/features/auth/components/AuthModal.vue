<template>
  <!-- Modal Backdrop with Transition -->
  <Transition
    name="modal"
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="modal-backdrop"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Background overlay -->
      <div class="modal-overlay" @click="closeModal" />

      <!-- Modal panel -->
      <div class="modal-container">
        <Transition
          name="modal-panel"
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div v-if="isOpen" class="modal-panel" @click.stop>
            <!-- Close button -->
            <div class="modal-close-container">
              <button type="button" class="modal-close-btn" @click="closeModal">
                <span class="sr-only">Close</span>
                <svg
                  class="icon-sm"
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
            <div class="modal-content">
              <div class="modal-content-inner">
                <AuthHeader :is-signup="isSignup" />
                <div class="mt-4">
                  <LoginForm
                    :is-signup="isSignup"
                    @toggle-mode="toggleAuthMode"
                    @auth-success="handleAuthSuccess"
                  />
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
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
