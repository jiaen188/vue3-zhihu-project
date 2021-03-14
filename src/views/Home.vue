<template>
  <div class="home-page">
    <column-list :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '../components/ColumnList.vue'
import { GlobalDataProps } from '../store'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.colums)
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    return {
      list
    }
  }
})
</script>
