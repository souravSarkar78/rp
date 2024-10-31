<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <!-- Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold">Notifications</h1>
            <button 
              v-if="hasUnread"
              @click="markAllAsRead"
              class="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Mark all as read
            </button>
          </div>

          <!-- Filters -->
          <div class="flex flex-wrap gap-4">
            <button 
              v-for="filter in filters"
              :key="filter.value"
              @click="activeFilter = filter.value"
              class="px-4 py-2 rounded-full text-sm transition-colors"
              :class="[
                activeFilter === filter.value 
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>

        <!-- Notification List -->
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="notification in filteredNotifications"
            :key="notification.id"
            :class="[
              'p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition',
              { 'bg-indigo-50 dark:bg-indigo-900/20': !notification.read }
            ]"
          >
            <div class="flex items-start space-x-4">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <component 
                  :is="notificationIcons[notification.type]" 
                  class="w-8 h-8"
                  :class="notificationColors[notification.type]"
                />
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-gray-100">
                      {{ notification.title }}
                    </p>
                    <p class="mt-1 text-gray-600 dark:text-gray-400">
                      {{ notification.message }}
                    </p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <time 
                      :datetime="notification.timestamp"
                      class="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {{ formatTime(notification.timestamp) }}
                    </time>
                    <button 
                      v-if="!notification.read"
                      @click="markAsRead(notification)"
                      class="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Mark as read
                    </button>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-3 flex space-x-4">
                  <button 
                    @click="handleAction(notification)"
                    class="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    View {{ getActionText(notification.type) }}
                  </button>
                  <button 
                    @click="removeNotification(notification.id)"
                    class="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div 
            v-if="filteredNotifications.length === 0" 
            class="p-8 text-center text-gray-500 dark:text-gray-400"
          >
            <svg 
              class="mx-auto h-12 w-12 mb-4 text-gray-400 dark:text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
              />
            </svg>
            <p class="text-lg font-medium">No notifications found</p>
            <p class="mt-1">{{ getEmptyStateMessage() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNotifications } from '~/composables/useNotifications'

const activeFilter = ref('all')
const notifications = ref([
  {
    id: 1,
    type: 'mention',
    title: 'New Mention',
    message: '@janedoe mentioned you in a comment on your story "The Last Chapter"',
    timestamp: Date.now() - 1000 * 60 * 5,
    read: false,
    data: { storyId: 1, commentId: 123 }
  },
  {
    id: 2,
    type: 'like',
    title: 'New Like',
    message: 'Your story "The Last Chapter" received a like from @johndoe',
    timestamp: Date.now() - 1000 * 60 * 30,
    read: false,
    data: { storyId: 1 }
  },
  {
    id: 3,
    type: 'comment',
    title: 'New Comment',
    message: '@sarahsmith commented on your poem "Midnight Dreams"',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    read: true,
    data: { poemId: 1, commentId: 456 }
  },
  {
    id: 4,
    type: 'follow',
    title: 'New Follower',
    message: '@markwilson started following you',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    read: true,
    data: { userId: 'markwilson' }
  }
])

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Unread', value: 'unread' },
  { label: 'Mentions', value: 'mention' },
  { label: 'Likes', value: 'like' },
  { label: 'Comments', value: 'comment' },
  { label: 'Follows', value: 'follow' }
]

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
  }),
  follow: defineComponent({
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    `
  })
}

const notificationColors = {
  mention: 'text-purple-600 dark:text-purple-400',
  like: 'text-red-600 dark:text-red-400',
  comment: 'text-blue-600 dark:text-blue-400',
  follow: 'text-green-600 dark:text-green-400'
}

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'all') return notifications.value
  if (activeFilter.value === 'unread') return notifications.value.filter(n => !n.read)
  return notifications.value.filter(n => n.type === activeFilter.value)
})

const hasUnread = computed(() => notifications.value.some(n => !n.read))

function formatTime(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  // Less than 1 minute
  if (diff < 60000) {
    return 'Just now'
  }

  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `${minutes}m ago`
  }

  // Less than 1 day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours}h ago`
  }

  // Less than 7 days
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000)
    return `${days}d ago`
  }

  // Format as date
  return date.toLocaleDateString()
}

function markAllAsRead() {
  notifications.value = notifications.value.map(n => ({ ...n, read: true }))
}

function markAsRead(notification) {
  notification.read = true
}

function removeNotification(id) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

function getActionText(type) {
  switch (type) {
    case 'mention':
    case 'comment':
      return 'comment'
    case 'like':
      return 'post'
    case 'follow':
      return 'profile'
    default:
      return 'details'
  }
}

function handleAction(notification) {
  // Navigate to the relevant page based on notification type and data
  switch (notification.type) {
    case 'mention':
    case 'comment':
      // Navigate to the comment
      break
    case 'like':
      // Navigate to the liked content
      break
    case 'follow':
      // Navigate to the follower's profile
      break
  }
}

function getEmptyStateMessage() {
  if (activeFilter.value === 'unread') {
    return 'You have no unread notifications'
  }
  if (activeFilter.value === 'all') {
    return 'You have no notifications yet'
  }
  return `You have no ${activeFilter.value} notifications`
}
</script>