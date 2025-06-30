<template>
  <div class="space-y-6">
    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Notes</h1>
      <button
        @click="showForm = true"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        aria-label="Add new note"
      >
        <PlusIcon class="w-5 h-5 mr-2" aria-hidden="true" />
        Add Note
      </button>
    </header>

    <!-- Search Bar -->
    <div class="relative" role="search">
      <label for="notes-search" class="sr-only">Search notes</label>
      <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
      <input
        id="notes-search"
        v-model="searchTerm"
        type="text"
        placeholder="Search notes..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>

    <!-- Category Filter Selector -->
    <div class="flex items-center gap-3">
      <label for="category-filter" class="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by category:</label>
      <select
        id="category-filter"
        v-model="selectedCategory"
        class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[200px]"
      >
        <option value="all">All ({{ notes.length }})</option>
        <option v-for="category in categories" :key="category" :value="category" class="capitalize">
          {{ category }} ({{ getCategoryCount(category) }})
        </option>
      </select>
    </div>

    <!-- Note Form Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" :aria-labelledby="editingNote ? 'edit-note-title' : 'add-note-title'">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <header class="mb-4">
          <h2 :id="editingNote ? 'edit-note-title' : 'add-note-title'" class="text-xl font-bold text-gray-900 dark:text-white">
            {{ editingNote ? 'Edit Note' : 'Add New Note' }}
          </h2>
        </header>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <fieldset>
            <legend class="sr-only">Note Information</legend>
            
            <div>
              <label for="note-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                id="note-title"
                v-model="form.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label for="note-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                id="note-category"
                v-model="form.category"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select a category</option>
                <option v-for="category in categories" :key="category" :value="category" class="capitalize">
                  {{ category }}
                </option>
              </select>
            </div>

            <div>
              <label for="note-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                id="note-description"
                v-model="form.description"
                rows="5"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              ></textarea>
            </div>
          </fieldset>

          <div class="flex space-x-3">
            <button
              type="submit"
              class="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {{ editingNote ? 'Update' : 'Save' }}
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

    <!-- Notes List -->
    <main>
      <section aria-labelledby="notes-heading">
        <h2 id="notes-heading" class="sr-only">Your Notes</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" role="list">
          <li
            v-for="note in filteredNotes"
            :key="note.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700 w-full max-w-[320px] mx-auto"
          >
            <article class="flex flex-col h-full">
              <!-- Title and Category -->
              <header class="flex items-start justify-between mb-2">
                <div class="flex-1 min-w-0">
                  <h3 class="text-base font-semibold text-gray-900 dark:text-white truncate mb-1">{{ note.title }}</h3>
                  <span class="inline-block px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full capitalize">
                    {{ note.category }}
                  </span>
                </div>
                
                <!-- Action buttons -->
                <nav class="flex items-center space-x-1 ml-2" aria-label="Note actions">
                  <button
                    @click="editNote(note)"
                    class="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Edit note"
                    :aria-label="`Edit note: ${note.title}`"
                  >
                    <EditIcon class="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    @click="deleteNote(note.id)"
                    class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Delete note"
                    :aria-label="`Delete note: ${note.title}`"
                  >
                    <TrashIcon class="w-4 h-4" aria-hidden="true" />
                  </button>
                </nav>
              </header>
              
              <!-- Description -->
              <div class="flex-1">
                <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">{{ note.description }}</p>
              </div>
              
              <!-- Date -->
              <footer class="mt-auto">
                <time class="text-xs text-gray-400 dark:text-gray-500">
                  Created: {{ formatDate(note.createdAt) }}
                  <span v-if="note.updatedAt !== note.createdAt" class="block">
                    Updated: {{ formatDate(note.updatedAt) }}
                  </span>
                </time>
              </footer>
            </article>
          </li>
        </ul>

        <div v-if="filteredNotes.length === 0" class="col-span-full text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">
            {{ selectedCategory === 'all' 
              ? 'No notes found. Add your first note to get started!' 
              : `No notes found in the "${selectedCategory}" category.`
            }}
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from '../components/Icons.vue'

interface Note {
  id: string
  title: string
  category: string
  description: string
  createdAt: string
  updatedAt: string
}

const categories = ['course', 'entertainment', 'hacking', 'medicine', 'research', 'programming', 'tools', 'others']

const notes = ref<Note[]>([])
const showForm = ref(false)
const editingNote = ref<Note | null>(null)
const searchTerm = ref('')
const selectedCategory = ref<string>('all')

const form = ref({
  title: '',
  category: '',
  description: ''
})

const filteredNotes = computed(() => {
  let filtered = notes.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(note => note.category === selectedCategory.value)
  }

  // Filter by search term
  if (searchTerm.value) {
    filtered = filtered.filter(note =>
      note.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      note.category.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  return filtered
})

const getCategoryCount = (category: string) => {
  return notes.value.filter(note => note.category === category).length
}

onMounted(() => {
  const stored = localStorage.getItem('notes')
  if (stored) {
    notes.value = JSON.parse(stored)
  }
})

const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes.value))
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleSubmit = () => {
  const now = new Date().toISOString()
  
  if (editingNote.value) {
    const index = notes.value.findIndex(n => n.id === editingNote.value!.id)
    notes.value[index] = {
      ...form.value,
      id: editingNote.value.id,
      createdAt: editingNote.value.createdAt,
      updatedAt: now
    }
  } else {
    notes.value.unshift({
      ...form.value,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    })
  }
  
  saveNotes()
  closeForm()
}

const editNote = (note: Note) => {
  editingNote.value = note
  form.value = { title: note.title, category: note.category, description: note.description }
  showForm.value = true
}

const deleteNote = (id: string) => {
  if (confirm('Are you sure you want to delete this note?')) {
    notes.value = notes.value.filter(n => n.id !== id)
    saveNotes()
  }
}

const closeForm = () => {
  showForm.value = false
  editingNote.value = null
  form.value = {
    title: '',
    category: '',
    description: ''
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>