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
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Add New Login
          </h2>
          <button
            @click="closeModal"
            class="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
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
            <!-- Website URL (Required) -->
            <div>
              <label
                for="url"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Website URL *
              </label>
              <input
                id="url"
                v-model="formData.url"
                type="url"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="https://example.com"
              />
              <p
                v-if="extractedWebsiteName"
                class="mt-1 text-xs text-gray-500 dark:text-gray-400"
              >
                Website: {{ extractedWebsiteName }}
              </p>
            </div>

            <!-- Username/Email -->
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Username / Email *
              </label>
              <input
                id="username"
                v-model="formData.username"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Username or email"
              />
            </div>

            <!-- Password -->
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password *
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-3 py-2 pr-16 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Password"
                />
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="button"
                    @click="togglePasswordVisibility"
                    class="px-1.5 py-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Toggle password visibility"
                  >
                    <svg
                      v-if="showPassword"
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    @click="generatePassword"
                    class="px-1.5 py-1 text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 text-xs font-medium"
                    title="Generate password"
                  >
                    Gen
                  </button>
                </div>
              </div>
            </div>

            <!-- Collection -->
            <div>
              <label
                for="collections"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Collection
              </label>
              <select
                id="collections"
                v-model="selectedCollection"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Select a collection</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Social">Social</option>
                <option value="Finance">Finance</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
              </select>
            </div>

            <!-- Notes -->
            <div>
              <label
                for="notes"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Notes
              </label>
              <textarea
                id="notes"
                v-model="formData.notes"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm resize-none"
                placeholder="Optional notes..."
              />
            </div>

            <!-- Error message -->
            <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">
              {{ error }}
            </div>

            <!-- Modal Actions -->
            <div class="flex space-x-3 pt-3">
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 inline-flex justify-center items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span
                  v-if="loading"
                  class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                ></span>
                {{ loading ? "Adding..." : "Add Login" }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
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
import { ref, watch, onUnmounted, computed } from "vue";
import type { Login } from "../model";

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: "close"): void;
  (e: "save", login: Login): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const loading = ref(false);
const error = ref("");
const showPassword = ref(false);

// Form data
const formData = ref({
  url: "",
  username: "",
  password: "",
  notes: "",
});

const selectedCollection = ref<string>("");

// Extract website name from URL
const extractedWebsiteName = computed(() => {
  if (!formData.value.url) return "";

  try {
    const url = new URL(formData.value.url);
    const hostname = url.hostname;

    // Remove 'www.' if present
    const domain = hostname.replace(/^www\./, "");

    // Extract the main domain name (before the first dot)
    const domainParts = domain.split(".");
    const mainDomain = domainParts[0];

    // Capitalize first letter
    return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
  } catch {
    return "";
  }
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
      resetForm();
    } else {
      unlockBodyScroll();
    }
  },
  { immediate: true }
);

// Cleanup on component unmount
onUnmounted(() => {
  unlockBodyScroll();
});

// Form functions
const resetForm = () => {
  formData.value = {
    url: "",
    username: "",
    password: "",
    notes: "",
  };
  selectedCollection.value = "";
  error.value = "";
  showPassword.value = false;
  loading.value = false;
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const generatePassword = () => {
  const length = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  formData.value.password = password;
};

const validateForm = (): boolean => {
  error.value = "";

  // Website URL validation
  if (!formData.value.url.trim()) {
    error.value = "Website URL is required";
    return false;
  }

  // Validate URL format
  try {
    const url = new URL(formData.value.url.trim());

    // Check if URL has valid protocol
    if (!["http:", "https:"].includes(url.protocol)) {
      error.value = "URL must start with http:// or https://";
      return false;
    }

    // Check if URL has valid hostname
    if (!url.hostname || url.hostname.length < 3) {
      error.value = "Please enter a valid website URL";
      return false;
    }
  } catch {
    error.value = "Please enter a valid URL (e.g., https://example.com)";
    return false;
  }

  // URL length validation
  if (formData.value.url.trim().length > 2048) {
    error.value = "Website URL is too long (maximum 2048 characters)";
    return false;
  }

  // Username validation
  if (!formData.value.username.trim()) {
    error.value = "Username or email is required";
    return false;
  }

  if (formData.value.username.trim().length < 1) {
    error.value = "Username cannot be empty";
    return false;
  }

  if (formData.value.username.trim().length > 100) {
    error.value = "Username is too long (maximum 100 characters)";
    return false;
  }

  // If username looks like an email, validate email format
  if (formData.value.username.includes("@")) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.value.username.trim())) {
      error.value = "Please enter a valid email address";
      return false;
    }
  }

  // Password validation
  if (!formData.value.password.trim()) {
    error.value = "Password is required";
    return false;
  }

  if (formData.value.password.length < 1) {
    error.value = "Password cannot be empty";
    return false;
  }

  if (formData.value.password.length > 512) {
    error.value = "Password is too long (maximum 512 characters)";
    return false;
  }

  // Notes validation (optional field)
  if (formData.value.notes && formData.value.notes.length > 1000) {
    error.value = "Notes are too long (maximum 1000 characters)";
    return false;
  }

  return true;
};

const closeModal = () => {
  unlockBodyScroll();
  emit("close");
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    // Use extracted website name
    const websiteName = extractedWebsiteName.value || "Unknown";

    // Generate favicon emoji based on website name
    const generateFavicon = (website: string): string => {
      const icons: Record<string, string> = {
        amazon: "🛒",
        google: "🔍",
        gmail: "📧",
        github: "🐙",
        facebook: "📘",
        twitter: "🐦",
        instagram: "📷",
        youtube: "📺",
        netflix: "🎬",
        spotify: "🎵",
        microsoft: "🪟",
        apple: "🍎",
        linkedin: "💼",
        reddit: "🤖",
        discord: "🎮",
        slack: "💬",
        zoom: "📹",
        dropbox: "📦",
        paypal: "💳",
        ebay: "🛍️",
      };

      const siteName = website.toLowerCase();
      for (const [key, icon] of Object.entries(icons)) {
        if (siteName.includes(key)) {
          return icon;
        }
      }
      return "🌐"; // Default icon
    };

    const loginData: Login = {
      id: `login_${Date.now()}`,
      website: websiteName,
      url: formData.value.url.trim(),
      username: formData.value.username.trim(),
      password: formData.value.password,
      notes: formData.value.notes.trim() || undefined,
      favicon: generateFavicon(websiteName),
      collections: selectedCollection.value
        ? [selectedCollection.value]
        : undefined,
      lastUsed: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    emit("save", loginData);
    closeModal();
  } catch (err) {
    error.value = "Failed to save login. Please try again.";
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
