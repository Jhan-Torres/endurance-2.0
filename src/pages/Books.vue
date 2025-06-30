<template>
  <div class="space-y-6">
    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Book Recommendations</h1>
      <button
        @click="showForm = true"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        aria-label="Add new book"
      >
        <PlusIcon class="w-5 h-5 mr-2" aria-hidden="true" />
        Add Book
      </button>
    </header>

    <!-- Tabs -->
    <nav class="border-b border-gray-200 dark:border-gray-700" role="tablist" aria-label="Book categories">
      <div class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'all'"
          :class="activeTab === 'all' 
            ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'"
          class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          role="tab"
          :aria-selected="activeTab === 'all'"
          :aria-controls="activeTab === 'all' ? 'all-books-panel' : undefined"
        >
          All Books ({{ books.length }})
        </button>
        <button
          @click="activeTab = 'reading'"
          :class="activeTab === 'reading' 
            ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'"
          class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          role="tab"
          :aria-selected="activeTab === 'reading'"
          :aria-controls="activeTab === 'reading' ? 'reading-books-panel' : undefined"
        >
          Reading Zone ({{ readingBooks.length }})
        </button>
      </div>
    </nav>

    <!-- Search Bar -->
    <div class="relative" role="search">
      <label for="books-search" class="sr-only">Search books</label>
      <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
      <input
        id="books-search"
        v-model="searchTerm"
        type="text"
        placeholder="Search books..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>

    <!-- Book Form Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" :aria-labelledby="editingBook ? 'edit-book-title' : 'add-book-title'">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <header class="mb-4">
          <h2 :id="editingBook ? 'edit-book-title' : 'add-book-title'" class="text-xl font-bold text-gray-900 dark:text-white">
            {{ editingBook ? 'Edit Book' : 'Add New Book' }}
          </h2>
        </header>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <fieldset>
            <legend class="sr-only">Book Information</legend>
            
            <div>
              <label for="book-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                id="book-name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label for="book-author" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
              <input
                id="book-author"
                v-model="form.author"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label for="book-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                id="book-category"
                v-model="form.category"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select a category</option>
                <option v-for="category in bookCategories" :key="category" :value="category" class="capitalize">
                  {{ category }}
                </option>
              </select>
            </div>

            <div>
              <label for="book-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                id="book-description"
                v-model="form.description"
                rows="3"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              ></textarea>
            </div>

            <div>
              <label for="book-pdf-link" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PDF Link (Optional)</label>
              <input
                id="book-pdf-link"
                v-model="form.pdfLink"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <fieldset>
                <legend class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</legend>
                <div class="flex items-center space-x-1" role="radiogroup" aria-label="Book rating">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    @click="form.rating = star"
                    class="text-2xl transition-colors duration-200"
                    :class="star <= form.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                    :aria-label="`Rate ${star} star${star > 1 ? 's' : ''}`"
                    role="radio"
                    :aria-checked="form.rating === star"
                  >
                    ★
                  </button>
                </div>
              </fieldset>
            </div>

            <div class="flex items-center space-x-2">
              <input
                id="isReading"
                v-model="form.isReading"
                type="checkbox"
                class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 bg-white dark:bg-gray-700"
              />
              <label for="isReading" class="text-sm text-gray-700 dark:text-gray-300">Currently reading</label>
            </div>
          </fieldset>

          <div class="flex space-x-3">
            <button
              type="submit"
              class="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {{ editingBook ? 'Update' : 'Save' }}
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

    <!-- Books List -->
    <main>
      <section 
        :id="activeTab === 'all' ? 'all-books-panel' : 'reading-books-panel'"
        role="tabpanel"
        :aria-labelledby="activeTab === 'all' ? 'all-books-tab' : 'reading-books-tab'"
      >
        <h2 class="sr-only">{{ activeTab === 'all' ? 'All Books' : 'Currently Reading Books' }}</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" role="list">
          <li
            v-for="book in filteredBooks"
            :key="book.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700 w-full max-w-[320px] mx-auto"
          >
            <article class="flex flex-col h-full">
              <!-- Title and Reading Status -->
              <header class="flex items-start justify-between mb-2">
                <div class="flex-1 min-w-0">
                  <h3 class="text-base font-semibold text-gray-900 dark:text-white truncate mb-1">{{ book.name }}</h3>
                  <span v-if="book.isReading" class="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                    Currently Reading
                  </span>
                </div>
                
                <!-- Action buttons -->
                <nav class="flex items-center space-x-1 ml-2" aria-label="Book actions">
                  <button
                    @click="editBook(book)"
                    class="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Edit book"
                    :aria-label="`Edit book: ${book.name}`"
                  >
                    <EditIcon class="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    @click="deleteBook(book.id)"
                    class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Delete book"
                    :aria-label="`Delete book: ${book.name}`"
                  >
                    <TrashIcon class="w-4 h-4" aria-hidden="true" />
                  </button>
                </nav>
              </header>
              
              <!-- Author -->
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">by {{ book.author }}</p>
              
              <!-- Category and Rating -->
              <div class="flex items-center gap-3 mb-3">
                <span class="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full capitalize">
                  {{ book.category }}
                </span>
                <div class="flex items-center" role="img" :aria-label="`Rating: ${book.rating} out of 5 stars`">
                  <span v-for="star in 5" :key="star" class="text-sm" :class="star <= book.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'" aria-hidden="true">
                    ★
                  </span>
                  <span class="ml-1 text-xs text-gray-500 dark:text-gray-400">({{ book.rating }}/5)</span>
                </div>
              </div>
              
              <!-- Description -->
              <div class="flex-1">
                <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">{{ book.description }}</p>
              </div>
              
              <!-- Action Links and Date -->
              <footer class="mt-auto">
                <nav class="flex items-center gap-4 text-xs mb-2" aria-label="Book links and actions">
                  <a
                    v-if="book.pdfLink"
                    :href="book.pdfLink"
                    target="_blank"
                    class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                    :aria-label="`Read ${book.name} online`"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Read Online
                  </a>
                  <button
                    @click="toggleReading(book.id)"
                    class="inline-flex items-center font-medium transition-colors duration-200"
                    :class="book.isReading ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'"
                    :aria-label="book.isReading ? `Remove ${book.name} from reading zone` : `Add ${book.name} to reading zone`"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="book.isReading ? 'M6 18L18 6M6 6l12 12' : 'M12 4v16m8-8H4'" />
                    </svg>
                    {{ book.isReading ? 'Remove from Reading' : 'Add to Reading' }}
                  </button>
                </nav>
                
                <!-- Date Added -->
                <time class="text-xs text-gray-400 dark:text-gray-500" :datetime="book.createdAt">
                  Added: {{ formatDate(book.createdAt) }}
                </time>
              </footer>
            </article>
          </li>
        </ul>

        <div v-if="filteredBooks.length === 0" class="col-span-full text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">
            {{ activeTab === 'reading' 
              ? 'No books in your reading zone yet.' 
              : 'No books found. Add your first book to get started!' 
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

interface Book {
  id: string
  name: string
  author: string
  category: string
  description: string
  pdfLink: string
  rating: number
  isReading: boolean
  createdAt: string
}

const bookCategories = [
  'fiction',
  'non-fiction',
  'science',
  'technology',
  'business',
  'self-help',
  'biography',
  'history',
  'philosophy',
  'psychology',
  'health',
  'cooking',
  'travel',
  'art',
  'religion',
  'education',
  'children',
  'romance',
  'mystery',
  'fantasy',
  'horror',
  'poetry',
  'others'
]

const books = ref<Book[]>([])
const showForm = ref(false)
const editingBook = ref<Book | null>(null)
const searchTerm = ref('')
const activeTab = ref<'all' | 'reading'>('all')

const form = ref({
  name: '',
  author: '',
  category: '',
  description: '',
  pdfLink: '',
  rating: 5,
  isReading: false
})

const readingBooks = computed(() => books.value.filter(book => book.isReading))

const filteredBooks = computed(() => {
  let bookList = activeTab.value === 'reading' ? readingBooks.value : books.value
  
  return bookList.filter(book =>
    book.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

onMounted(() => {
  const stored = localStorage.getItem('books')
  if (stored) {
    books.value = JSON.parse(stored)
  }
})

const saveBooks = () => {
  localStorage.setItem('books', JSON.stringify(books.value))
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleSubmit = () => {
  const now = new Date().toISOString()
  
  if (editingBook.value) {
    const index = books.value.findIndex(b => b.id === editingBook.value!.id)
    books.value[index] = {
      ...form.value,
      id: editingBook.value.id,
      createdAt: editingBook.value.createdAt
    }
  } else {
    books.value.unshift({
      ...form.value,
      id: crypto.randomUUID(),
      createdAt: now
    })
  }
  
  saveBooks()
  closeForm()
}

const editBook = (book: Book) => {
  editingBook.value = book
  form.value = { ...book }
  showForm.value = true
}

const deleteBook = (id: string) => {
  if (confirm('Are you sure you want to delete this book?')) {
    books.value = books.value.filter(b => b.id !== id)
    saveBooks()
  }
}

const toggleReading = (id: string) => {
  const book = books.value.find(b => b.id === id)
  if (book) {
    book.isReading = !book.isReading
    saveBooks()
  }
}

const closeForm = () => {
  showForm.value = false
  editingBook.value = null
  form.value = {
    name: '',
    author: '',
    category: '',
    description: '',
    pdfLink: '',
    rating: 5,
    isReading: false
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