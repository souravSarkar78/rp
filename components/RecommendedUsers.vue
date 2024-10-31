<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h2 class="text-lg font-semibold mb-4">Recommended Writers</h2>
    <div class="space-y-4">
      <div v-for="i in 3" :key="i" class="flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          class="w-10 h-10 rounded-full"
        >
        <div class="flex-1">
          <div class="font-medium">Writer Name</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">@username</div>
        </div>
        <button class="px-4 py-1 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
          Follow
        </button>
      </div>
    </div>
  </div>
</template>