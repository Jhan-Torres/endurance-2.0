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
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-auto max-h-[85vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ isSpanish ? "Editar Información" : "Edit Information" }}
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
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {{ isSpanish ? "Nombre Completo" : "Full Name" }}
              </label>
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <!-- Email -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {{ isSpanish ? "Correo Electrónico" : "Email Address" }}
              </label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <!-- Modal Actions -->
            <div class="flex space-x-3 pt-4">
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 inline-flex justify-center items-center px-3 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span
                  v-if="loading"
                  class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                ></span>
                {{
                  loading
                    ? isSpanish
                      ? "Guardando..."
                      : "Saving..."
                    : isSpanish
                    ? "Guardar Cambios"
                    : "Save Changes"
                }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="px-3 py-2 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                {{ isSpanish ? "Cancelar" : "Cancel" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
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
  isOpen: boolean;
  userProfile: UserProfile | null;
}

interface Emits {
  close: [];
  save: [profile: Pick<UserProfile, "name" | "email">];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const loading = ref(false);

// Form data
const formData = ref({
  name: "",
  email: "",
});

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
      if (props.userProfile) {
        loadUserData();
      }
    } else {
      unlockBodyScroll();
    }
  },
  { immediate: true }
);

// Watch for userProfile changes
watch(
  () => props.userProfile,
  (newProfile) => {
    if (newProfile && props.isOpen) {
      loadUserData();
    }
  }
);

// Cleanup on component unmount
onUnmounted(() => {
  unlockBodyScroll();
});

// Load user data into form
const loadUserData = () => {
  if (props.userProfile) {
    formData.value = {
      name: props.userProfile.name,
      email: props.userProfile.email,
    };
  }
};

// Form functions
const resetForm = () => {
  formData.value = {
    name: "",
    email: "",
  };
  loading.value = false;
};

const closeModal = () => {
  unlockBodyScroll();
  resetForm();
  emit("close");
};

const handleSubmit = async () => {
  if (!formData.value.name.trim() || !formData.value.email.trim()) return;

  loading.value = true;

  try {
    emit("save", {
      name: formData.value.name.trim(),
      email: formData.value.email.trim(),
    });
    closeModal();
  } catch (err) {
    console.error("Failed to save profile:", err);
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
