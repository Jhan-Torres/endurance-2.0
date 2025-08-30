<template>
  <div class="space-y-6">
    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Password Manager</h1>
      <button
        @click="showForm = true"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        aria-label="Add new password"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Password
      </button>
    </header>

    <!-- Search Bar -->
    <div class="relative" role="search">
      <label for="password-search" class="sr-only">Search passwords</label>
      <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        id="password-search"
        v-model="searchTerm"
        type="text"
        placeholder="Search passwords..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>

    <!-- Password List -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Loading passwords...</p>
    </div>

    <div v-else-if="filteredPasswords.length === 0" class="text-center py-8">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No passwords found</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first password.' }}
      </p>
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="password in filteredPasswords"
        :key="password.id"
        class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span class="text-primary-600 dark:text-primary-400 font-semibold">
                {{ password.title.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ password.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ password.username }}</p>
              <p v-if="password.url" class="text-xs text-gray-400 dark:text-gray-500">{{ password.url }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="copyPassword(password.password)"
              class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              title="Copy password"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              @click="editPassword(password)"
              class="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              title="Edit password"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="confirmDelete(password)"
              class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              title="Delete password"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Password Form Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="closeForm">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {{ editingPassword ? 'Edit Password' : 'Add New Password' }}
        </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Gmail, Facebook"
            />
          </div>

          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username/Email</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="button"
                  @click="generateNewPassword"
                  class="px-2 py-1 text-xs bg-primary-600 text-white rounded mr-1 hover:bg-primary-700"
                  title="Generate password"
                >
                  Gen
                </button>
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg v-if="showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL (optional)</label>
            <input
              id="url"
              v-model="form.url"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes (optional)</label>
            <textarea
              id="notes"
              v-model="form.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Additional notes..."
            ></textarea>
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
              {{ editingPassword ? 'Update' : 'Add' }} Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePasswords } from '../features/passwords/composables/usePasswords'
import type { Password } from '../features/passwords/types/password.types'

const { 
  passwords, 
  loading, 
  loadPasswords, 
  addPassword, 
  updatePassword, 
  deletePassword, 
  generatePassword,
  searchPasswords 
} = usePasswords()

const showForm = ref(false)
const editingPassword = ref<Password | null>(null)
const searchTerm = ref('')
const showPassword = ref(false)

const form = ref({
  title: '',
  username: '',
  password: '',
  url: '',
  notes: ''
})

const filteredPasswords = computed(() => {
  return searchPasswords(searchTerm.value)
})

onMounted(() => {
  loadPasswords()
})

const handleSubmit = () => {
  if (editingPassword.value) {
    updatePassword(editingPassword.value.id, {
      title: form.value.title,
      username: form.value.username,
      password: form.value.password,
      url: form.value.url,
      notes: form.value.notes
    })
  } else {
    addPassword({
      title: form.value.title,
      username: form.value.username,
      password: form.value.password,
      url: form.value.url,
      notes: form.value.notes
    })
  }
  closeForm()
}

const editPassword = (password: Password) => {
  editingPassword.value = password
  form.value = {
    title: password.title,
    username: password.username,
    password: password.password,
    url: password.url || '',
    notes: password.notes || ''
  }
  showForm.value = true
}

const confirmDelete = (password: Password) => {
  if (confirm(`Are you sure you want to delete the password for ${password.title}?`)) {
    deletePassword(password.id)
  }
}

const generateNewPassword = () => {
  form.value.password = generatePassword(16)
}

const copyPassword = async (password: string) => {
  try {
    await navigator.clipboard.writeText(password)
    // Show success message - you might want to implement a toast notification
  } catch (err) {
    console.error('Failed to copy password:', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = password
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

const closeForm = () => {
  showForm.value = false
  editingPassword.value = null
  showPassword.value = false
  form.value = {
    title: '',
    username: '',
    password: '',
    url: '',
    notes: ''
  }
}
</script>
