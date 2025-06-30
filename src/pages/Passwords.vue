<template>
  <div class="space-y-6">
    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Password Manager</h1>
      <button
        @click="showForm = true"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        aria-label="Add new password"
      >
        <PlusIcon class="w-5 h-5 mr-2" aria-hidden="true" />
        Add Password
      </button>
    </header>

    <!-- Search Bar -->
    <div class="relative" role="search">
      <label for="password-search" class="sr-only">Search passwords</label>
      <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
      <input
        id="password-search"
        v-model="searchTerm"
        type="text"
        placeholder="Search passwords..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>

    <!-- Password Form Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" :aria-labelledby="editingPassword ? 'edit-password-title' : 'add-password-title'">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <header class="mb-4">
          <h2 :id="editingPassword ? 'edit-password-title' : 'add-password-title'" class="text-xl font-bold text-gray-900 dark:text-white">
            {{ editingPassword ? 'Edit Password' : 'Add New Password' }}
          </h2>
        </header>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <fieldset>
            <legend class="sr-only">Password Information</legend>
            
            <div>
              <label for="website" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website/App</label>
              <input
                id="website"
                v-model="form.website"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <EyeIcon v-if="!showPassword" class="w-5 h-5" aria-hidden="true" />
                  <EyeOffIcon v-else class="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              
              <!-- Password Strength Indicator -->
              <div v-if="form.password" class="mt-2" role="status" :aria-label="`Password strength: ${passwordStrength.label}`">
                <div class="flex items-center space-x-2">
                  <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="passwordStrength.color"
                      :style="{ width: passwordStrength.percentage + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium" :class="passwordStrength.textColor">
                    {{ passwordStrength.label }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex space-x-2">
              <button
                type="button"
                @click="generatePassword"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Generate Strong Password
              </button>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              ></textarea>
            </div>
          </fieldset>

          <div class="flex space-x-3">
            <button
              type="submit"
              class="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {{ editingPassword ? 'Update' : 'Save' }}
            </button>
            <button
              type="button"
              @click="closeForm"
              class="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Password List -->
    <main>
      <section aria-labelledby="passwords-heading">
        <h2 id="passwords-heading" class="sr-only">Your Passwords</h2>
        <ul class="grid gap-3" role="list">
          <li
            v-for="password in filteredPasswords"
            :key="password.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
          >
            <article class="flex items-center justify-between">
              <!-- Left side: Website info and avatar -->
              <div class="flex items-center space-x-3">
                <!-- Website Avatar -->
                <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg" aria-hidden="true">
                  {{ getWebsiteInitial(password.website) }}
                </div>
                
                <!-- Website name and username -->
                <div>
                  <h3 class="text-base font-semibold text-gray-900 dark:text-white">
                    {{ getDisplayName(password.website) }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ password.username }}
                  </p>
                </div>
              </div>

              <!-- Right side: Action buttons -->
              <nav class="flex items-center space-x-2" aria-label="Password actions">
                <!-- Copy Password Button -->
                <button
                  @click="copyPassword(password.password)"
                  class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  title="Copy password"
                  aria-label="Copy password to clipboard"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>

                <!-- Open Website Button (only if it's a valid URL) -->
                )
                <button
                  v-if="isValidUrl(password.website)"
                  @click="openWebsite(password.website)"
                  class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  title="Open website"
                  :aria-label="`Open ${password.website} in new tab`"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>

                <!-- Edit Button -->
                <button
                  @click="editPassword(password)"
                  class="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  title="Edit password"
                  :aria-label="`Edit password for ${password.website}`"
                >
                  <EditIcon class="w-5 h-5" aria-hidden="true" />
                </button>

                <!-- Delete Button -->
                <button
                  @click="deletePassword(password.id)"
                  class="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  title="Delete password"
                  :aria-label="`Delete password for ${password.website}`"
                >
                  <TrashIcon class="w-5 h-5" aria-hidden="true" />
                </button>
              </nav>
            </article>
          </li>
        </ul>

        <div v-if="filteredPasswords.length === 0" class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">No passwords found. Add your first password to get started!</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  PlusIcon, 
  SearchIcon, 
  EyeIcon, 
  EyeOffIcon, 
  EditIcon, 
  TrashIcon, 
  CopyIcon 
} from '../components/Icons.vue'

interface Password {
  id: string
  website: string
  username: string
  password: string
  description: string
  createdAt: string
}

const passwords = ref<Password[]>([])
const showForm = ref(false)
const editingPassword = ref<Password | null>(null)
const searchTerm = ref('')
const showPassword = ref(false)
const showPasswords = ref<Record<string, boolean>>({})

const form = ref({
  website: '',
  username: '',
  password: '',
  description: ''
})

const filteredPasswords = computed(() => {
  return passwords.value.filter(password =>
    password.website.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    password.username.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const passwordStrength = computed(() => {
  const password = form.value.password
  if (!password) return { percentage: 0, label: '', color: '', textColor: '' }

  let score = 0
  let feedback = []

  // Length check
  if (password.length >= 8) score += 25
  else feedback.push('at least 8 characters')

  // Uppercase check
  if (/[A-Z]/.test(password)) score += 25
  else feedback.push('uppercase letters')

  // Lowercase check
  if (/[a-z]/.test(password)) score += 25
  else feedback.push('lowercase letters')

  // Number and symbol check
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 25
  else feedback.push('numbers and symbols')

  if (score <= 25) return { 
    percentage: score, 
    label: 'Weak', 
    color: 'bg-red-500', 
    textColor: 'text-red-600 dark:text-red-400' 
  }
  if (score <= 50) return { 
    percentage: score, 
    label: 'Fair', 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-600 dark:text-yellow-400' 
  }
  if (score <= 75) return { 
    percentage: score, 
    label: 'Good', 
    color: 'bg-blue-500', 
    textColor: 'text-blue-600 dark:text-blue-400' 
  }
  return { 
    percentage: score, 
    label: 'Strong', 
    color: 'bg-green-500', 
    textColor: 'text-green-600 dark:text-green-400' 
  }
})

// Function to extract clean website name from URL
const getDisplayName = (website: string) => {
  // Remove protocol (http://, https://)
  let cleanName = website.replace(/^https?:\/\//, '')
  
  // Remove www.
  cleanName = cleanName.replace(/^www\./, '')
  
  // Remove everything after the first slash (path)
  cleanName = cleanName.split('/')[0]
  
  // Remove everything after the first dot to get the main domain name
  const parts = cleanName.split('.')
  if (parts.length > 1) {
    // Take the first part (main domain name) and capitalize it
    cleanName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
  } else {
    // If no dots, just capitalize the first letter
    cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1)
  }
  
  return cleanName
}

// Function to get the first letter of website name for avatar
const getWebsiteInitial = (website: string) => {
  const displayName = getDisplayName(website)
  return displayName.charAt(0).toUpperCase()
}

// Function to check if website is a valid URL
const isValidUrl = (website: string) => {
  // Check if it's already a full URL or if it looks like a domain
  return website.includes('.') || website.startsWith('http')
}

// Function to open website in new tab
const openWebsite = (website: string) => {
  let url = website
  
  // Add protocol if not present
  if (!website.startsWith('http://') && !website.startsWith('https://')) {
    url = 'https://' + website
  }
  
  window.open(url, '_blank')
}

onMounted(() => {
  const stored = localStorage.getItem('passwords')
  if (stored) {
    passwords.value = JSON.parse(stored)
  }
})

const savePasswords = () => {
  localStorage.setItem('passwords', JSON.stringify(passwords.value))
}

const generatePassword = () => {
  const length = 16
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  let password = ''
  
  // Ensure at least one character from each category
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)]
  }
  
  // Shuffle the password
  form.value.password = password.split('').sort(() => Math.random() - 0.5).join('')
}

const handleSubmit = () => {
  const now = new Date().toISOString()
  
  if (editingPassword.value) {
    const index = passwords.value.findIndex(p => p.id === editingPassword.value!.id)
    passwords.value[index] = {
      ...form.value,
      id: editingPassword.value.id,
      createdAt: editingPassword.value.createdAt
    }
  } else {
    passwords.value.unshift({
      ...form.value,
      id: crypto.randomUUID(),
      createdAt: now
    })
  }
  
  savePasswords()
  closeForm()
}

const editPassword = (password: Password) => {
  editingPassword.value = password
  form.value = { ...password }
  showForm.value = true
}

const deletePassword = (id: string) => {
  if (confirm('Are you sure you want to delete this password?')) {
    passwords.value = passwords.value.filter(p => p.id !== id)
    savePasswords()
  }
}

const togglePasswordVisibility = (id: string) => {
  showPasswords.value[id] = !showPasswords.value[id]
}

const copyPassword = async (password: string) => {
  try {
    await navigator.clipboard.writeText(password)
    // You could add a toast notification here
    console.log('Password copied to clipboard!')
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
    website: '',
    username: '',
    password: '',
    description: ''
  }
}
</script>