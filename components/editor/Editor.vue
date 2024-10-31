<template>
  <div>
    <div ref="editorElement" class="prose dark:prose-invert max-w-none" />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Start writing...'
  },
  error: String
})

const emit = defineEmits(['update:modelValue'])
const editorElement = ref(null)
let editor = null

onMounted(async () => {
  // Dynamically import Editor.js and its plugins
  const [
    { default: EditorJS },
    { default: Header },
    { default: List },
    { default: Image },
    { default: Quote },
    { default: Checklist },
    { default: Embed }
  ] = await Promise.all([
    import('@editorjs/editorjs'),
    import('@editorjs/header'),
    import('@editorjs/list'),
    import('@editorjs/image'),
    import('@editorjs/quote'),
    import('@editorjs/checklist'),
    import('@editorjs/embed')
  ])

  const config = {
    holder: editorElement.value,
    placeholder: props.placeholder,
    tools: {
      header: {
        class: Header,
        config: {
          levels: [2, 3, 4],
          defaultLevel: 2
        }
      },
      list: {
        class: List,
        inlineToolbar: true
      },
      image: {
        class: Image,
        config: {
          endpoints: {
            byFile: '/api/uploadImage', // You'll need to implement this endpoint
          },
          uploader: {
            uploadByFile(file) {
              return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                  resolve({
                    success: 1,
                    file: {
                      url: e.target.result
                    }
                  })
                }
                reader.readAsDataURL(file)
              })
            }
          }
        }
      },
      quote: Quote,
      checklist: {
        class: Checklist,
        inlineToolbar: true
      },
      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true
          }
        }
      }
    },
    onChange: async () => {
      const data = await editor.save()
      emit('update:modelValue', JSON.stringify(data))
    },
    data: typeof props.modelValue === 'string' 
      ? JSON.parse(props.modelValue || '{"blocks":[]}')
      : props.modelValue || { blocks: [] }
  }

  editor = new EditorJS(config)
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
  }
})

watch(() => props.modelValue, (newVal) => {
  if (editor && !editor.isReady) {
    editor.isReady.then(() => {
      if (typeof newVal === 'string') {
        try {
          const parsedData = JSON.parse(newVal)
          editor.render(parsedData)
        } catch {
          editor.render({ blocks: [] })
        }
      } else if (newVal) {
        editor.render(newVal)
      }
    })
  }
}, { immediate: true })
</script>

<style>
.codex-editor__redactor {
  padding-bottom: 100px !important;
}

/* Fix for content width */
.ce-block__content,
.ce-toolbar__content {
  max-width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/* Additional styles for better editor appearance */
.ce-toolbar__plus,
.ce-toolbar__settings-btn {
  color: inherit !important;
}

.dark .ce-toolbar__plus,
.dark .ce-toolbar__settings-btn {
  background-color: #374151 !important;
}

.dark .ce-block--selected {
  background-color: rgba(55, 65, 81, 0.3) !important;
}
</style>