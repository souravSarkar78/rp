<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            Writers Hub
          </router-link>
          <div class="ml-6 relative">
            <input
              type="text"
              placeholder="Search..."
              class="w-64 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none"
            >
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <NotificationDropdown />
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import ProfileDropdown from './ProfileDropdown.vue'
import NotificationDropdown from './notifications/NotificationDropdown.vue'
</script>