<template>
  <main class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Personal Information
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Manage your personal information for auto-filling forms
        </p>
      </div>
      
      <button
        @click="openCreateModal"
        v-if="!hasPersonalInfo"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add Personal Info
      </button>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex items-center justify-center py-12"
    >
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-600 dark:text-gray-400">Loading personal information...</span>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
    >
      <div class="flex">
        <svg class="w-5 h-5 text-red-400 dark:text-red-300 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Error loading personal information</h3>
          <p class="text-sm text-red-700 dark:text-red-300 mt-1">{{ error }}</p>
          <button
            @click="loadPersonalInfo()"
            class="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-500 font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    </div>

    <!-- No Personal Info State -->
    <div
      v-else-if="!hasPersonalInfo"
      class="text-center py-12"
    >
      <div class="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-4">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No personal information found
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Add your personal information to auto-fill forms on websites. This includes your name, contact details, and address.
      </p>
      <button
        @click="openCreateModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add Personal Information
      </button>
    </div>

    <!-- Personal Info Display -->
    <div v-else class="space-y-6">
      <!-- Personal Info Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Card Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ fullName }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Personal Information Profile
              </p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button
              @click="openEditModal"
              class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              title="Edit personal information"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button
              @click="confirmDelete"
              class="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Delete personal information"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Card Content -->
        <div class="p-6 space-y-6">
          <!-- Basic Information -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <span class="text-gray-500 dark:text-gray-400">Name:</span>
                <span class="ml-2 text-gray-900 dark:text-white">{{ fullName }}</span>
              </div>
              <div v-if="personalInfo?.dateOfBirth">
                <span class="text-gray-500 dark:text-gray-400">Date of Birth:</span>
                <span class="ml-2 text-gray-900 dark:text-white">{{ formatDate(personalInfo.dateOfBirth) }}</span>
              </div>
              <div v-if="personalInfo?.gender">
                <span class="text-gray-500 dark:text-gray-400">Gender:</span>
                <span class="ml-2 text-gray-900 dark:text-white capitalize">{{ personalInfo.gender.replace('-', ' ') }}</span>
              </div>
              <div v-if="personalInfo?.nationality">
                <span class="text-gray-500 dark:text-gray-400">Nationality:</span>
                <span class="ml-2 text-gray-900 dark:text-white">{{ personalInfo.nationality }}</span>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Contact Information</h3>
            
            <!-- Phone Numbers -->
            <div v-if="personalInfo?.phoneNumbers.length" class="mb-4">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Phone Numbers</p>
              <div class="space-y-1">
                <div 
                  v-for="phone in personalInfo.phoneNumbers" 
                  :key="phone.id"
                  class="flex items-center gap-2 text-sm"
                >
                  <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs uppercase">
                    {{ phone.type }}
                  </span>
                  <span class="text-gray-900 dark:text-white">{{ phone.countryCode }} {{ phone.number }}</span>
                  <span v-if="phone.isPrimary" class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-xs">
                    Primary
                  </span>
                </div>
              </div>
            </div>

            <!-- Email Addresses -->
            <div v-if="personalInfo?.emails.length">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Email Addresses</p>
              <div class="space-y-1">
                <div 
                  v-for="email in personalInfo.emails" 
                  :key="email.id"
                  class="flex items-center gap-2 text-sm"
                >
                  <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs uppercase">
                    {{ email.type }}
                  </span>
                  <span class="text-gray-900 dark:text-white">{{ email.email }}</span>
                  <span v-if="email.isPrimary" class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-xs">
                    Primary
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div v-if="fullAddress">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Address</h3>
            <p class="text-sm text-gray-900 dark:text-white">{{ fullAddress }}</p>
          </div>

          <!-- Professional Information -->
          <div v-if="personalInfo?.occupation || personalInfo?.company || personalInfo?.website">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Professional Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div v-if="personalInfo?.occupation">
                <span class="text-gray-500 dark:text-gray-400">Occupation:</span>
                <span class="ml-2 text-gray-900 dark:text-white">{{ personalInfo.occupation }}</span>
              </div>
              <div v-if="personalInfo?.company">
                <span class="text-gray-500 dark:text-gray-400">Company:</span>
                <span class="ml-2 text-gray-900 dark:text-white">{{ personalInfo.company }}</span>
              </div>
              <div v-if="personalInfo?.website">
                <span class="text-gray-500 dark:text-gray-400">Website:</span>
                <a 
                  :href="personalInfo.website" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 hover:underline"
                >
                  {{ personalInfo.website }}
                </a>
              </div>
            </div>
          </div>

          <!-- Auto-fill Information -->
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100">Auto-fill Ready</h4>
                <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  This information can be used to automatically fill forms on websites, saving you time when filling out contact forms, shipping addresses, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Personal Info Modal -->
    <EditPersonalInfoModal
      :is-open="showModal"
      :personal-info="selectedPersonalInfo"
      @close="closeModal"
      @success="handleSuccess"
    />

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="showDeleteConfirmation"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Delete Personal Information</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Are you sure you want to delete your personal information? This action cannot be undone.
              </p>
            </div>
          </div>
          
          <div class="flex justify-end gap-3">
            <button
              @click="showDeleteConfirmation = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleDelete"
              :disabled="isDeleting"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <svg
                v-if="isDeleting"
                class="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isDeleting ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePersonalInfo } from "../composables/usePersonalInfo";
import EditPersonalInfoModal from "./EditPersonalInfoModal.vue";
import type { PersonalInfo } from "@endurance/shared-types";

// Composables
const { 
  personalInfo, 
  loading, 
  error, 
  hasPersonalInfo, 
  fullName, 
  fullAddress, 
  loadPersonalInfo,
  deletePersonalInfo 
} = usePersonalInfo();

// State
const showModal = ref(false);
const selectedPersonalInfo = ref<PersonalInfo | null>(null);
const showDeleteConfirmation = ref(false);
const isDeleting = ref(false);

// Methods
const openCreateModal = () => {
  selectedPersonalInfo.value = null;
  showModal.value = true;
};

const openEditModal = () => {
  selectedPersonalInfo.value = personalInfo.value;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedPersonalInfo.value = null;
};

const handleSuccess = (updatedPersonalInfo: PersonalInfo) => {
  // The composable will handle updating the state
  // We could show a success message here if needed
  console.log("Personal info updated successfully:", updatedPersonalInfo);
};

const confirmDelete = () => {
  showDeleteConfirmation.value = true;
};

const handleDelete = async () => {
  if (!personalInfo.value) return;
  
  isDeleting.value = true;
  
  try {
    const success = await deletePersonalInfo(personalInfo.value.id);
    if (success) {
      showDeleteConfirmation.value = false;
      // The composable will handle updating the state
    }
  } catch (error) {
    console.error("Failed to delete personal info:", error);
  } finally {
    isDeleting.value = false;
  }
};

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Load personal info on mount
onMounted(() => {
  loadPersonalInfo();
});
</script>
