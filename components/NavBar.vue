<template>
  <nav class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Left section -->
        <div class="flex items-center gap-6">
          <router-link 
            to="/" 
            class="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hover:from-indigo-600 hover:to-purple-600"
          >
            Writers Hub
          </router-link>
          
          <!-- Search Bar -->
          <div class="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search stories..."
              class="w-72 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white dark:placeholder-gray-400 transition-all"
            >
            <span class="absolute right-3 top-2.5 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <!-- Right section -->
        <div class="flex items-center gap-4">
          <!-- Create Button -->


          <!-- Notifications -->
          <NotificationDropdown />

          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg 
              v-if="isDark"
              class="w-5 h-5 text-yellow-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg 
              v-else
              class="w-5 h-5 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Profile Dropdown -->
          <ProfileDropdown />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import NotificationDropdown from './notifications/NotificationDropdown.vue'
import ProfileDropdown  from './ProfileDropdown.vue'
import { useDarkMode } from '~/composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
</script>