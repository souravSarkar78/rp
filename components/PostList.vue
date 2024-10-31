<template>
  <div class="space-y-6">
    <div v-for="i in 3" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/40"
          alt="Author"
          class="w-10 h-10 rounded-full"
        >
        <div>
          <div class="font-medium">Jane Smith</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">2 hours ago</div>
        </div>
      </div>
      
      <div class="mt-4">
        <h3 class="text-xl font-semibold mb-2">The Art of Storytelling</h3>
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Story • Creative Writing
        </div>
        <p class="text-gray-800 dark:text-gray-200">
          A preview of the story content would go here. This is a sample text that shows how the content would be displayed in the feed...
        </p>
      </div>
      
      <div class="mt-4 flex items-center space-x-4">
        <button class="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600">
          <span>324</span>
          <span>Likes</span>
        </button>
        <button class="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600">
          <span>42</span>
          <span>Comments</span>
        </button>
        <button class="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600">
          Share
        </button>
      </div>
    </div>
  </div>
</template>