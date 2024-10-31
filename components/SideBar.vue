<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="text-center">
        <img
          src="https://via.placeholder.com/96"
          alt="Profile"
          class="w-24 h-24 rounded-full mx-auto"
        >
        <h2 class="mt-4 text-xl font-semibold">John Doe</h2>
        <p class="text-gray-600 dark:text-gray-400">@johndoe</p>
        <p class="mt-2 text-sm">Writer, poet, and storyteller exploring the depths of human imagination.</p>
        
        <div class="mt-4 flex justify-center space-x-4">
          <div class="text-center">
            <div class="font-semibold">1.2k</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Followers</div>
          </div>
          <div class="text-center">
            <div class="font-semibold">843</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Following</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <nav class="space-y-1">
        <NuxtLink to="/" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700" :class="{ 'bg-gray-50 dark:bg-gray-700': $route.path === '/' }">
          Home
        </NuxtLink>
        <NuxtLink to="/books" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700" :class="{ 'bg-gray-50 dark:bg-gray-700': $route.path === '/books' }">
          My Books
        </NuxtLink>
        <NuxtLink to="/poems" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700" :class="{ 'bg-gray-50 dark:bg-gray-700': $route.path === '/poems' }">
          Poems
        </NuxtLink>
        <NuxtLink to="/bookmarks" class="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700" :class="{ 'bg-gray-50 dark:bg-gray-700': $route.path === '/bookmarks' }">
          Bookmarks
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>