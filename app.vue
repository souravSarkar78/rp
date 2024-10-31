<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <NavBar />
    <NuxtPage />
    <NotificationList ref="notificationList" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NotificationList from '~/components/notifications/NotificationList.vue'
import { useNotifications } from '~/composables/useNotifications'

const { notificationList } = useNotifications()

onMounted(() => {
  // Example notification (you can remove this in production)
  notificationList.value.add({
    type: 'success',
    title: 'Welcome!',
    message: 'The notification system is now ready to use.',
    duration: 5000
  })
})
</script>