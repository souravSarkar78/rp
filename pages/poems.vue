<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-3">
        <SideBar />
      </div>
      <main class="md:col-span-9">
        <h1 class="text-2xl font-bold mb-6">My Poems</h1>
        <div class="grid gap-6">
          <div v-for="i in 5" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-semibold">Poem Title {{ i }}</h3>
              <button class="text-indigo-600 hover:text-indigo-800">Edit</button>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4 whitespace-pre-line">
              Here lies the beautiful verses
              Of a poem that touches hearts
              With rhythm and rhyme
              Through space and time...
            </p>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>Published: Jan 2024</span>
              <div class="flex items-center space-x-4">
                <span>❤️ 42 likes</span>
                <span>💬 12 comments</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>