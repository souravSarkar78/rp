<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium mb-1">Book Title *</label>
      <input
        v-model="localTitle"
        type="text"
        class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
        :class="{ 'border-red-500': errors?.title }"
      >
      <p v-if="errors?.title" class="mt-1 text-sm text-red-500">{{ errors.title }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Author Name</label>
      <input
        v-model="localAuthor"
        type="text"
        class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
      >
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Genres</label>
      <select
        v-model="localGenres"
        multiple
        class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
      >
        <option v-for="genre in availableGenres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Tags</label>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="tag in localTags"
          :key="tag"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center"
        >
          <span>{{ tag }}</span>
          <button
            @click="removeTag(tag)"
            class="ml-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <input
          v-model="newTag"
          @keydown.enter.prevent="addTag"
          type="text"
          placeholder="Add tag..."
          class="px-3 py-1 border rounded-full dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: String,
  author: String,
  genres: Array,
  tags: Array,
  errors: Object
})

const emit = defineEmits(['update:title', 'update:author', 'update:genres', 'update:tags'])

const localTitle = computed({
  get: () => props.title,
  set: (value) => emit('update:title', value)
})

const localAuthor = computed({
  get: () => props.author,
  set: (value) => emit('update:author', value)
})

const localGenres = computed({
  get: () => props.genres,
  set: (value) => emit('update:genres', value)
})

const localTags = computed({
  get: () => props.tags,
  set: (value) => emit('update:tags', value)
})

const newTag = ref('')

const availableGenres = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Horror',
  'Biography',
  'Self-Help'
]

function addTag() {
  if (newTag.value && !localTags.value.includes(newTag.value)) {
    emit('update:tags', [...localTags.value, newTag.value])
  }
  newTag.value = ''
}

function removeTag(tagToRemove) {
  emit('update:tags', localTags.value.filter(tag => tag !== tagToRemove))
}
</script>