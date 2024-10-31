<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-3">
        <SideBar />
      </div>
      <main class="md:col-span-9">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">My Books</h1>
          <button
            @click="showEditor = true"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Book
          </button>
        </div>

        <!-- Book Editor Modal -->
        <div v-if="showEditor" class="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
          <div class="min-h-screen px-4 py-8">
            <div class="relative max-w-4xl mx-auto">
              <button
                @click="showEditor = false"
                class="absolute -top-4 -right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <BookEditor @saved="handleBookSaved" />
            </div>
          </div>
        </div>

        <!-- Books Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="book in books" :key="book.id" class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <img :src="book.coverImage || 'https://via.placeholder.com/400x250'" :alt="book.title" class="w-full h-48 object-cover">
            <div class="p-4">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold mb-1">{{ book.title }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ book.author }}</p>
                </div>
                <span 
                  class="px-2 py-1 text-xs rounded-full"
                  :class="book.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
                >
                  {{ book.status }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{{ book.introduction }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span 
                  v-for="genre in book.genres" 
                  :key="genre"
                  class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200 rounded-full"
                >
                  {{ genre }}
                </span>
              </div>
              <div class="mt-4 flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ formatDate(book.updatedAt) }}</span>
                <button 
                  @click="editBook(book)"
                  class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotifications } from '~/composables/useNotifications'
import BookEditor from '~/components/books/BookEditor.vue'

const { success } = useNotifications()
const showEditor = ref(false)

// Sample books data - replace with actual API call
const books = ref([
  {
    id: 1,
    title: 'The Art of Writing',
    author: 'John Doe',
    coverImage: 'https://via.placeholder.com/400x250',
    introduction: 'A comprehensive guide to creative writing',
    genres: ['Non-Fiction', 'Self-Help'],
    status: 'published',
    updatedAt: new Date('2024-01-15')
  }
])

function handleBookSaved(book) {
  showEditor.value = false
  success('Success', 'Book saved successfully')
  // Refresh books list here
}

function editBook(book) {
  // Implement edit functionality
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}
</script>