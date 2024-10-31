import { ref } from 'vue'

const notificationList = ref()

export function useNotifications() {
  const show = (notification) => {
    if (notificationList.value) {
      notificationList.value.add(notification)
    }
  }

  const success = (title: string, message: string) => {
    show({ type: 'success', title, message })
  }

  const error = (title: string, message: string) => {
    show({ type: 'error', title, message })
  }

  const info = (title: string, message: string) => {
    show({ type: 'info', title, message })
  }

  return {
    notificationList,
    success,
    error,
    info
  }
}