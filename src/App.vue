<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return {}
  }
})
</script>

<style scoped>
.app {
  height: 100%;
}
</style>
