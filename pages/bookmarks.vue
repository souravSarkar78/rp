<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-3">
        <SideBar />
      </div>
      <main class="md:col-span-9">
        <h1 class="text-2xl font-bold mb-6">My Bookmarks</h1>
        <div class="grid gap-6">
          <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <img src="https://via.placeholder.com/40" alt="Author" class="w-10 h-10 rounded-full">
                <div>
                  <div class="font-medium">Author Name</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Bookmarked on Jan 2024</div>
                </div>
              </div>
              <button class="text-red-600 hover:text-red-800">Remove Bookmark</button>
            </div>
            <h3 class="text-xl font-semibold mb-2">Bookmarked Content Title {{ i }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              A preview of the bookmarked content goes here...
            </p>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span>❤️ 156 likes</span>
              <span>💬 24 comments</span>
              <span>📚 Book</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>