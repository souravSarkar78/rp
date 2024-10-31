<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Chapters</h2>
      <button
        @click="addChapter"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Add Chapter
      </button>
    </div>

    <draggable
      v-model="localChapters"
      handle=".drag-handle"
      item-key="id"
      @end="$emit('reorder', localChapters)"
    >
      <template #item="{ element: chapter, index }">
        <div class="mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="flex items-center mb-4">
            <button class="drag-handle p-2 text-gray-500 cursor-move">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
              </svg>
            </button>
            <input
              v-model="chapter.title"
              type="text"
              class="flex-1 mx-2 px-3 py-2 rounded-lg border dark:bg-gray-600 dark:border-gray-500"
              placeholder="Chapter title"
              @input="updateChapter(index, 'title', $event.target.value)"
            >
            <button
              @click="removeChapter(index)"
              class="p-2 text-red-500 hover:text-red-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          <div class="prose dark:prose-invert max-w-none">
            <Editor
              v-model="chapter.content"
              :placeholder="`Write chapter ${index + 1} content...`"
              @update:modelValue="updateChapter(index, 'content', $event)"
            />
          </div>
        </div>
      </template>
    </draggable>

    <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import draggable from 'vuedraggable'
import Editor from '../editor/Editor.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  error: String
})

const emit = defineEmits(['update:modelValue', 'reorder'])

const localChapters = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function addChapter() {
  const newChapter = {
    id: Date.now(),
    title: '',
    content: ''
  }
  emit('update:modelValue', [...props.modelValue, newChapter])
}

function removeChapter(index) {
  const updatedChapters = [...props.modelValue]
  updatedChapters.splice(index, 1)
  emit('update:modelValue', updatedChapters)
}

function updateChapter(index, field, value) {
  const updatedChapters = [...props.modelValue]
  updatedChapters[index] = {
    ...updatedChapters[index],
    [field]: value
  }
  emit('update:modelValue', updatedChapters)
}
</script>