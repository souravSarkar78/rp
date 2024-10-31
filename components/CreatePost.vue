<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
    <div class="flex space-x-4">
      <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        class="w-10 h-10 rounded-full"
      >
      <div class="flex-1">
        <input
          type="text"
          placeholder="Share your story..."
          class="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none"
        >
        <div class="mt-4 flex justify-between items-center">
          <div class="flex space-x-2">
            <button class="px-3 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Book
            </button>
            <button class="px-3 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Story
            </button>
            <button class="px-3 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Poem
            </button>
          </div>
          <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>