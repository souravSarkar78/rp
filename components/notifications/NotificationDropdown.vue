<template>
  <div class="relative">
    <button 
      @click.stop="toggleDropdown"
      class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <div v-if="unreadCount > 0" class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <span class="text-xs text-white">{{ unreadCount }}</span>
      </div>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-if="isOpen"
        ref="dropdownRef"
        class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
      >
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Notifications</h3>
            <button 
              v-if="hasUnread"
              @click="markAllAsRead"
              class="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Mark all as read
            </button>
          </div>
        </div>

        <div class="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            :class="[
              'p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer',
              { 'bg-indigo-50 dark:bg-indigo-900/20': !notification.read }
            ]"
            @click="handleNotificationClick(notification)"
          >
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <component 
                  :is="notificationIcons[notification.type]" 
                  class="w-6 h-6"
                  :class="notificationColors[notification.type]"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ notification.title }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ notification.message }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {{ formatTime(notification.timestamp) }}
                </p>
              </div>
              <div v-if="!notification.read" class="flex-shrink-0">
                <div class="w-2 h-2 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
          No notifications
        </div>

        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <router-link 
            to="/notifications"
            @click="closeDropdown"
            class="block w-full text-center text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all notifications
          </router-link>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const dropdownRef = ref(null)

const notifications = ref([
  {
    id: 1,
    type: 'mention',
    title: 'New Mention',
    message: '@janedoe mentioned you in a comment',
    timestamp: Date.now() - 1000 * 60 * 5,
    read: false
  },
  {
    id: 2,
    type: 'like',
    title: 'New Like',
    message: 'Your story "The Last Chapter" received a like',
    timestamp: Date.now() - 1000 * 60 * 30,
    read: false
  },
  {
    id: 3,
    type: 'comment',
    title: 'New Comment',
    message: 'Someone commented on your poem',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    read: true
  }
])

const notificationIcons = {
  mention: defineComponent({
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    `
  }),
  like: defineComponent({
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    `
  }),
  comment: defineComponent({
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    `
  })
}

const notificationColors = {
  mention: 'text-purple-600 dark:text-purple-400',
  like: 'text-red-600 dark:text-red-400',
  comment: 'text-blue-600 dark:text-blue-400'
}

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)
const hasUnread = computed(() => unreadCount.value > 0)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

function markAllAsRead() {
  notifications.value = notifications.value.map(n => ({ ...n, read: true }))
}

function handleNotificationClick(notification) {
  notification.read = true
  // Add navigation logic here
  closeDropdown()
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`
  return date.toLocaleDateString()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>