<template>
  <!-- Loading state -->
  <div v-if="loading" class="text-center py-8">
    <div
      class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
    ></div>
    <p class="mt-2 text-gray-600 dark:text-gray-400">Loading passwords...</p>
  </div>

  <!-- Empty state -->
  <div v-else-if="passwords.length === 0" class="text-center py-8">
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
      No passwords found
    </h3>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {{
        searchTerm
          ? "Try adjusting your search terms."
          : "Get started by adding your first password."
      }}
    </p>
  </div>

  <!-- Table view -->
  <div
    v-else
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
  >
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Table header -->
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Item Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Last Used
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Collections
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody
          class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr
            v-for="password in passwords"
            :key="password.id"
            @click="openPasswordDetail(password)"
            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
          >
            <!-- Item name column with icon -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <!-- Website icon/favicon -->
                <div class="flex-shrink-0 h-10 w-10">
                  <div
                    class="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-lg"
                  >
                    {{ password.favicon || getWebsiteIcon(password.website) }}
                  </div>
                </div>
                <!-- Website name and username -->
                <div class="ml-4">
                  <div
                    class="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {{ password.website }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ password.username }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Last used column -->
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
            >
              {{ formatLastUsed(password.lastUsed) }}
            </td>

            <!-- Collections column -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="collection in password.collections"
                  :key="collection"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                >
                  {{ collection }}
                </span>
                <span
                  v-if="
                    !password.collections || password.collections.length === 0
                  "
                  class="text-sm text-gray-400 dark:text-gray-500"
                >
                  —
                </span>
              </div>
            </td>

            <!-- Actions column -->
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              @click.stop
            >
              <div class="flex items-center justify-end space-x-2">
                <!-- Copy password button -->
                <button
                  @click="$emit('copy-password', password.id)"
                  class="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                  :aria-label="`Copy password for ${password.website}`"
                  title="Copy password"
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>

                <!-- More actions dropdown -->
                <div class="relative" ref="dropdownRef">
                  <button
                    @click="toggleDropdown(password.id)"
                    class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                    :aria-label="`More actions for ${password.website}`"
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
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>

                  <!-- Dropdown menu -->
                  <Transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <div
                      v-if="activeDropdown === password.id"
                      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    >
                      <div class="py-1">
                        <button
                          @click="handleEdit(password)"
                          class="group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <svg
                            class="mr-3 h-4 w-4"
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
                          Edit
                        </button>
                        <button
                          @click="handleDelete(password.id)"
                          class="group flex items-center w-full px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <svg
                            class="mr-3 h-4 w-4"
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
                          Delete
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Password Detail Panel -->
  <PasswordDetailPanel
    :is-open="!!selectedPassword"
    :password="selectedPassword || passwords[0]"
    @close="closePasswordDetail"
    @save="handlePasswordSave"
    @delete="handlePasswordDelete"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { Password } from "../model";
import PasswordDetailPanel from "./PasswordDetailPanel.vue";

interface Props {
  passwords: Password[];
  loading: boolean;
  searchTerm: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "copy-password": [id: string];
  "edit-password": [password: Password];
  "delete-password": [id: string];
  "password-updated": [password: Password];
}>();

// Active dropdown and selected password state
const activeDropdown = ref<string | null>(null);
const selectedPassword = ref<Password | null>(null);

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

// Dropdown handlers
const toggleDropdown = (passwordId: string) => {
  activeDropdown.value =
    activeDropdown.value === passwordId ? null : passwordId;
};

const closeDropdown = () => {
  activeDropdown.value = null;
};

// Action handlers
const handleEdit = (password: Password) => {
  emit("edit-password", password);
  closeDropdown();
};

const handleDelete = (passwordId: string) => {
  emit("delete-password", passwordId);
  closeDropdown();
};

// Password detail panel handlers
const openPasswordDetail = (password: Password) => {
  selectedPassword.value = password;
  closeDropdown(); // Close any open dropdown
};

const closePasswordDetail = () => {
  selectedPassword.value = null;
};

const handlePasswordSave = (updatedPassword: Password) => {
  emit("password-updated", updatedPassword);
  closePasswordDetail();
};

const handlePasswordDelete = (passwordId: string) => {
  emit("delete-password", passwordId);
  closePasswordDetail();
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element;
  if (!target.closest(".relative")) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
