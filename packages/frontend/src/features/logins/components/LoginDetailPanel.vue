<template>
  <!-- Side Panel Backdrop -->
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
      @click="closePanel"
    />
  </Transition>

  <!-- Desktop Side Panel / Mobile Modal -->
  <Transition
    name="sidepanel"
    enter-active-class="duration-300 ease-out"
    enter-from-class="md:translate-x-full translate-y-full md:translate-y-0"
    enter-to-class="translate-x-0 translate-y-0"
    leave-active-class="duration-250 ease-in"
    leave-from-class="translate-x-0 translate-y-0"
    leave-to-class="md:translate-x-full translate-y-full md:translate-y-0"
  >
    <div
      v-if="isOpen"
      class="fixed md:right-0 md:top-0 bottom-0 left-0 right-0 md:left-auto z-50 h-full md:w-[500px] w-full bg-white dark:bg-gray-800 shadow-xl overflow-y-auto md:rounded-none rounded-t-2xl"
    >
      <!-- Panel Header -->
      <div
        class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
      >
        <!-- Mobile drag handle -->
        <div
          class="md:hidden w-full flex justify-center absolute -top-3 left-0"
        >
          <div class="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>

        <h2 class="text-base font-semibold text-gray-900 dark:text-white">
          {{ isEditing ? "Edit Login" : "Login Details" }}
        </h2>
        <button
          @click="closePanel"
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

      <!-- Panel Content -->
      <div class="p-4">
        <div v-if="!isEditing" class="space-y-4">
          <!-- Website Icon, Name and Action Buttons -->
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <div class="flex-shrink-0 h-10 w-10">
                <div
                  class="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-lg"
                >
                  {{ login.favicon || getWebsiteIcon(login.website) }}
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white truncate"
                >
                  {{ login.website }}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {{ login.url || `https://${login.website.toLowerCase()}` }}
                </p>
              </div>
            </div>

            <!-- Action Buttons (Edit and Delete) -->
            <div class="flex items-center space-x-2 flex-shrink-0">
              <button
                @click="startEditing"
                class="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                title="Edit login"
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
                @click="deleteLogin"
                class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                title="Delete login"
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

          <!-- Login Details -->
          <div class="space-y-3">
            <!-- Username -->
            <div>
              <label
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Username
              </label>
              <div class="flex items-center space-x-2">
                <div
                  class="flex-1 px-2 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-xs text-gray-900 dark:text-white"
                >
                  {{ login.username }}
                </div>
                <button
                  @click="copyToClipboard(login.username, 'Username')"
                  class="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                  title="Copy username"
                >
                  <svg
                    class="w-3.5 h-3.5"
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
              </div>
            </div>

            <!-- Password -->
            <div>
              <label
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div class="flex items-center space-x-2">
                <div
                  class="flex-1 px-2 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-mono text-gray-900 dark:text-white"
                >
                  {{ showPassword ? login.password : "••••••••••••" }}
                </div>
                <button
                  @click="togglePasswordVisibility"
                  class="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                  title="Toggle password visibility"
                >
                  <svg
                    v-if="showPassword"
                    class="w-3.5 h-3.5"
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
                    class="w-3.5 h-3.5"
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
                  @click="copyToClipboard(login.password, 'Password')"
                  class="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                  title="Copy password"
                >
                  <svg
                    class="w-3.5 h-3.5"
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
              </div>
            </div>

            <!-- URL -->
            <div v-if="login.url">
              <label
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Website URL
              </label>
              <div class="flex items-center space-x-2">
                <div
                  class="flex-1 px-2 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-xs text-gray-900 dark:text-white truncate"
                >
                  {{ login.url }}
                </div>
                <button
                  @click="openWebsite"
                  class="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                  title="Open website"
                >
                  <svg
                    class="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Collections -->
            <div>
              <label
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Collections
              </label>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="collection in login.collections"
                  :key="collection"
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                >
                  {{ collection }}
                </span>
                <span
                  v-if="!login.collections || login.collections.length === 0"
                  class="text-xs text-gray-400 dark:text-gray-500"
                >
                  No collections
                </span>
              </div>
            </div>

            <!-- Notes -->
            <div v-if="login.notes">
              <label
                class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Notes
              </label>
              <div
                class="px-2 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-xs text-gray-900 dark:text-white"
              >
                {{ login.notes }}
              </div>
            </div>

            <!-- Metadata -->
            <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div
                class="grid grid-cols-1 gap-2 text-xs text-gray-500 dark:text-gray-400"
              >
                <div v-if="login.lastUsed">
                  <span class="font-medium">Last used:</span>
                  {{ formatLastUsed(login.lastUsed) }}
                </div>
                <div>
                  <span class="font-medium">Created:</span>
                  {{ formatDate(login.createdAt) }}
                </div>
                <div>
                  <span class="font-medium">Modified:</span>
                  {{ formatDate(login.updatedAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Form -->
        <LoginEditForm
          v-else
          :login="login"
          @save="handleSave"
          @cancel="cancelEditing"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import type { Login } from "../model";
import LoginEditForm from "./LoginEditForm.vue";

interface Props {
  isOpen: boolean;
  login: Login;
}

interface Emits {
  (e: "close"): void;
  (e: "save", login: Login): void;
  (e: "delete", id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isEditing = ref(false);
const showPassword = ref(false);

// Body scroll lock functionality
const lockBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

const unlockBodyScroll = () => {
  document.body.style.overflow = "";
};

// Watch for panel open/close to manage body scroll
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      lockBodyScroll();
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

// Helper functions
const getWebsiteIcon = (website: string): string => {
  const icons: Record<string, string> = {
    amazon: "🛒",
    gmail: "📧",
    github: "🐙",
    facebook: "📘",
    twitter: "🐦",
    instagram: "📷",
    youtube: "📺",
    netflix: "🎬",
    spotify: "🎵",
    google: "🔍",
    microsoft: "🪟",
    apple: "🍎",
    default: "🌐",
  };

  const siteName = website.toLowerCase();
  for (const [key, icon] of Object.entries(icons)) {
    if (siteName.includes(key)) {
      return icon;
    }
  }
  return icons.default;
};

const formatLastUsed = (lastUsed?: Date): string => {
  if (!lastUsed) return "Never";

  const now = new Date();
  const diffTime = now.getTime() - lastUsed.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return diffYears === 1 ? "about 1 year ago" : `over ${diffYears} years ago`;
  } else if (diffMonths > 0) {
    return diffMonths === 1
      ? "about 1 month ago"
      : `about ${diffMonths} months ago`;
  } else if (diffDays > 0) {
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  } else {
    return "Today";
  }
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Actions
const closePanel = () => {
  unlockBodyScroll();
  emit("close");
  isEditing.value = false;
  showPassword.value = false;
};

const startEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const handleSave = (updatedLogin: Login) => {
  emit("save", updatedLogin);
  isEditing.value = false;
};

const deleteLogin = () => {
  if (confirm("Are you sure you want to delete this login?")) {
    emit("delete", props.login.id);
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const copyToClipboard = async (text: string, type: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  } catch (err) {
    // TODO: Handle copy error with user feedback
  }
};

const openWebsite = () => {
  const url = props.login.url || `https://${props.login.website.toLowerCase()}`;
  window.open(url, "_blank");
};
</script>
