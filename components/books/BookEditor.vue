<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">{{ isEditing ? 'Edit Book' : 'Create New Book' }}</h1>
        <div class="flex space-x-3">
          <button
            @click="saveAsDraft"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Save as Draft
          </button>
          <button
            @click="publish"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Publish
          </button>
        </div>
      </div>

      <BookBasicInfo
        v-model:title="book.title"
        v-model:author="book.author"
        v-model:genres="book.genres"
        v-model:tags="book.tags"
        :errors="errors"
      />
    </div>

    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <BookCoverUpload
        v-model="book.coverImage"
        :error="errors.coverImage"
      />
    </div>

    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <BookIntroduction
        v-model="book.introduction"
        :error="errors.introduction"
      />
    </div>

    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <BookChapters
        v-model="book.chapters"
        :error="errors.chapters"
        @reorder="handleChapterReorder"
      />
    </div>

    <div class="p-6">
      <BookSummary
        v-model="book.summary"
        :error="errors.summary"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useNotifications } from '~/composables/useNotifications'
import BookBasicInfo from './BookBasicInfo.vue'
import BookCoverUpload from './BookCoverUpload.vue'
import BookIntroduction from './BookIntroduction.vue'
import BookChapters from './BookChapters.vue'
import BookSummary from './BookSummary.vue'

const { success, error: showError } = useNotifications()

const isEditing = ref(false)
const errors = ref({})

const book = reactive({
  title: '',
  author: '',
  genres: [],
  tags: [],
  coverImage: null,
  introduction: '',
  chapters: [],
  summary: '',
  status: 'draft'
})

async function saveAsDraft() {
  try {
    book.status = 'draft'
    await saveBook()
    success('Success', 'Book saved as draft')
  } catch (err) {
    showError('Error', 'Failed to save book')
  }
}

async function publish() {
  if (!validateBook()) {
    showError('Validation Error', 'Please fill in all required fields')
    return
  }

  try {
    book.status = 'published'
    await saveBook()
    success('Success', 'Book published successfully')
  } catch (err) {
    showError('Error', 'Failed to publish book')
  }
}

function validateBook() {
  errors.value = {}
  let isValid = true

  if (!book.title) {
    errors.value.title = 'Title is required'
    isValid = false
  }

  if (!book.introduction) {
    errors.value.introduction = 'Introduction is required'
    isValid = false
  }

  if (!book.chapters.length) {
    errors.value.chapters = 'At least one chapter is required'
    isValid = false
  }

  return isValid
}

async function saveBook() {
  // API call to save book would go here
  console.log('Saving book:', book)
}

function handleChapterReorder(newOrder) {
  book.chapters = newOrder
}
</script>