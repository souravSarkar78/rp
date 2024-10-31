<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Summary</h2>
    <div class="prose dark:prose-invert max-w-none">
      <Editor
        v-model="localValue"
        :error="error"
        placeholder="Write your book's summary or afterword..."
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Editor from '../editor/Editor.vue'

const props = defineProps({
  modelValue: String,
  error: String
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>