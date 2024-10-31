<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen" 
      class="flex items-center space-x-2 focus:outline-none"
    >
      <img
        src="https://via.placeholder.com/32"
        alt="Profile"
        class="w-8 h-8 rounded-full"
      >
      <svg 
        class="w-4 h-4 text-gray-600 dark:text-gray-400"
        :class="{ 'transform rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50"
    >
      <NuxtLink 
        to="/profile"
        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Profile
      </NuxtLink>
      <NuxtLink 
        to="/settings"
        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Settings
      </NuxtLink>
      <div class="border-t border-gray-200 dark:border-gray-700"></div>
      <button 
        class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Sign out
      </button>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false)

// Close dropdown when clicking outside
onMounted(() => {
  const handleClick = (event) => {
    if (!event.target.closest('.relative')) {
      isOpen.value = false
    }
  }
  document.addEventListener('click', handleClick)
  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
  })
})
</script>