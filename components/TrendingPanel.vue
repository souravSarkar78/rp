<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
    <h2 class="text-lg font-semibold mb-4">Trending Now</h2>
    <div class="space-y-4">
      <div v-for="i in 5" :key="i" class="flex items-center space-x-2">
        <div class="text-gray-500 dark:text-gray-400">{{ i }}.</div>
        <div>
          <div class="font-medium">#WritingCommunity</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">1.2k posts</div>
        </div>
      </div>
    </div>
  </div>
</template>
