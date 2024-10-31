<template>
  <div 
    class="flex items-center p-4 mb-4 rounded-lg shadow-lg transition-all duration-300"
    :class="typeClasses[notification.type]"
  >
    <div class="flex-shrink-0 mr-3">
      <component :is="icons[notification.type]" class="w-5 h-5" />
    </div>
    <div class="flex-1 mr-2">
      <h4 class="font-semibold" :class="textClasses[notification.type]">
        {{ notification.title }}
      </h4>
      <p class="text-sm" :class="textClasses[notification.type]">
        {{ notification.message }}
      </p>
    </div>
    <button 
      @click="$emit('dismiss', notification.id)"
      class="flex-shrink-0 ml-4 hover:opacity-75 transition-opacity"
      :class="textClasses[notification.type]"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  notification: {
    type: Object,
    required: true
  }
})

defineEmits(['dismiss'])

const icons = {
  success: defineComponent({
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    `
  }),
  error: defineComponent({
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    `
  }),
  info: defineComponent({
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `
  })
}

const typeClasses = {
  success: 'bg-green-50 dark:bg-green-900/30',
  error: 'bg-red-50 dark:bg-red-900/30',
  info: 'bg-blue-50 dark:bg-blue-900/30'
}

const textClasses = {
  success: 'text-green-800 dark:text-green-200',
  error: 'text-red-800 dark:text-red-200',
  info: 'text-blue-800 dark:text-blue-200'
}
</script>