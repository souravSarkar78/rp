<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Profile Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6">
      <div class="relative h-48 rounded-t-lg bg-gradient-to-r from-indigo-500 to-purple-600">
        <button 
          @click="handleCoverEdit"
          class="absolute right-4 top-4 bg-black/30 text-white px-4 py-2 rounded-lg hover:bg-black/40 transition"
        >
          Edit Cover
        </button>
      </div>
      <div class="px-6 pb-6">
        <div class="flex flex-col md:flex-row items-center md:items-end -mt-20 mb-4">
          <img
            :src="profile.avatar || 'https://via.placeholder.com/150'"
            :alt="profile.name"
            class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
          >
          <div class="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h1 class="text-2xl font-bold">{{ profile.name }}</h1>
            <p class="text-gray-600 dark:text-gray-400">@{{ profile.username }}</p>
          </div>
          <button 
            @click="isEditing = true"
            class="md:ml-auto mt-4 md:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>
        </div>
        
        <p class="mb-4">{{ profile.bio }}</p>
        
        <div class="flex items-center space-x-4 text-sm">
          <div class="flex items-center">
            <span class="font-semibold">{{ profile.stats.followers }}</span>
            <span class="ml-1 text-gray-600 dark:text-gray-400">Followers</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold">{{ profile.stats.following }}</span>
            <span class="ml-1 text-gray-600 dark:text-gray-400">Following</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold">{{ profile.stats.posts }}</span>
            <span class="ml-1 text-gray-600 dark:text-gray-400">Posts</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Tabs -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav class="flex">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-6 py-4 text-sm font-medium transition"
            :class="activeTab === tab.id ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Books Grid -->
      <div v-if="activeTab === 'books'" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="book in books" 
            :key="book.id" 
            class="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden transition hover:shadow-lg"
          >
            <img :src="book.cover" :alt="book.title" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="font-semibold mb-2">{{ book.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ book.description }}</p>
              <div class="text-sm text-gray-500">Published: {{ book.publishedAt }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Poems List -->
      <div v-if="activeTab === 'poems'" class="p-6">
        <div class="space-y-6">
          <div 
            v-for="poem in poems" 
            :key="poem.id" 
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition hover:shadow-lg"
          >
            <h3 class="font-semibold mb-2">{{ poem.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2 whitespace-pre-line">{{ poem.content }}</p>
            <div class="text-sm text-gray-500">Published: {{ poem.publishedAt }}</div>
          </div>
        </div>
      </div>

      <!-- Stories List -->
      <div v-if="activeTab === 'stories'" class="p-6">
        <div class="space-y-6">
          <div 
            v-for="story in stories" 
            :key="story.id" 
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition hover:shadow-lg"
          >
            <h3 class="font-semibold mb-2">{{ story.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">{{ story.preview }}</p>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>Published: {{ story.publishedAt }}</span>
              <div class="flex items-center space-x-4">
                <span>❤️ {{ story.likes }} likes</span>
                <span>💬 {{ story.comments }} comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="isEditing" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Edit Profile</h2>
        <form @submit.prevent="saveProfile">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name</label>
              <input 
                v-model="editForm.name"
                type="text"
                class="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Bio</label>
              <textarea 
                v-model="editForm.bio"
                rows="3"
                class="w-full px-3 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              ></textarea>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button 
              type="button"
              @click="isEditing = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useNotifications } from '~/composables/useNotifications'

const { success, error } = useNotifications()

const activeTab = ref('books')
const isEditing = ref(false)

const tabs = [
  { id: 'books', name: 'Books' },
  { id: 'poems', name: 'Poems' },
  { id: 'stories', name: 'Stories' }
]

const profile = reactive({
  name: 'John Doe',
  username: 'johndoe',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Writer, poet, and storyteller exploring the depths of human imagination. Based in New York City.',
  stats: {
    followers: '1.2k',
    following: '843',
    posts: '156'
  }
})

const editForm = reactive({
  name: profile.name,
  bio: profile.bio
})

const books = ref([
  {
    id: 1,
    title: 'The Art of Writing',
    description: 'A comprehensive guide to creative writing',
    cover: 'https://via.placeholder.com/400x250',
    publishedAt: 'Jan 2024'
  }
])

const poems = ref([
  {
    id: 1,
    title: 'Midnight Dreams',
    content: 'Through starlit skies and moonlit seas\nWhere dreams take flight on gentle breeze',
    publishedAt: 'Jan 2024'
  }
])

const stories = ref([
  {
    id: 1,
    title: 'The Last Chapter',
    preview: 'In the dimly lit room, she opened the mysterious book one last time...',
    publishedAt: 'Jan 2024',
    likes: 42,
    comments: 12
  }
])

function saveProfile() {
  try {
    profile.name = editForm.name
    profile.bio = editForm.bio
    isEditing = false
    success('Profile Updated', 'Your profile has been successfully updated.')
  } catch (err) {
    error('Update Failed', 'Failed to update profile. Please try again.')
  }
}

function handleCoverEdit() {
  info('Coming Soon', 'Cover image upload functionality will be available soon.')
}
</script>