<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-3">
        <SideBar />
      </div>
      <main class="md:col-span-6">
        <CreatePost />
        <FeedToggle />
        <PostList />
      </main>
      <div class="md:col-span-3">
        <TrendingPanel />
        <RecommendedUsers />
      </div>
    </div>
  </div>
</template>