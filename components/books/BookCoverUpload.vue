<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Book Cover</h2>
    <div
      class="border-2 border-dashed rounded-lg p-8 text-center"
      :class="[
        isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600',
        error ? 'border-red-500' : ''
      ]"
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <div v-if="preview" class="mb-4">
        <img :src="preview" alt="Cover preview" class="max-h-64 mx-auto">
      </div>
      <div v-else class="text-gray-500 dark:text-gray-400">
        <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="mb-2">Drag and drop your cover image here</p>
        <p class="text-sm">or</p>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      >
      <button
        @click="fileInput?.click()"
        class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Select Image
      </button>
      <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: [File, null],
  error: String
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const isDragging = ref(false)
const preview = ref(null)

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  }
}

function handleDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processFile(file)
  }
}

function processFile(file) {
  emit('update:modelValue', file)
  const reader = new FileReader()
  reader.onload = e => {
    preview.value = e.target.result
  }
  reader.readAsDataURL(file)
}
</script>