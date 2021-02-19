<template>
<div class="dropdown" ref="dropdownRef">
  <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
    {{title}}
  </a>
  <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
    <slot></slot>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const handler = (e: MouseEvent) => {
      if (dropdownRef.value) {
        console.log(dropdownRef.value)
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) { // 当点击的节点包含在dropdownRef节点内，且isOpen为true，则设置isOpen为false，关闭dropdown
          isOpen.value = false
        }
      }
    }

    onMounted(() => {
      document.addEventListener('click', handler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })

    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
