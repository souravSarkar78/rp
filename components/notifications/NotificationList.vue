<template>
  <div class="fixed top-4 right-4 z-50 w-full max-w-sm space-y-4">
    <TransitionGroup 
      name="notification"
      tag="div"
      class="space-y-2"
    >
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @dismiss="dismissNotification"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NotificationItem from './NotificationItem.vue'

const notifications = ref([])
let nextId = 1

const addNotification = (notification) => {
  const id = nextId++
  notifications.value.push({
    id,
    ...notification,
    timeout: setTimeout(() => {
      dismissNotification(id)
    }, notification.duration || 5000)
  })
}

const dismissNotification = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    clearTimeout(notification.timeout)
    notifications.value = notifications.value.filter(n => n.id !== id)
  }
}

// Expose methods to parent components
defineExpose({
  add: addNotification,
  dismiss: dismissNotification
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>