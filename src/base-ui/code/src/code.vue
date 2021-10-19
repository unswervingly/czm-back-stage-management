<template>
  <div class="czm-code">
    <pre class="bg">
      <code :class="'language'+language" v-html="highlightedCode"></code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default defineComponent({
  name: 'CzmCode',
  props: {
    language: {
      type: String,
      default: 'html'
    },
    code: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const highlightedCode = ref<string>('')

    watchEffect(() => {
      highlightedCode.value = hljs.highlight(props.code, {
        language: props.language
      }).value
    })

    return {
      highlightedCode
    }
  }
})
</script>

<style scoped>
.bg {
  text-align: left;
  background: #f0f0f0;
  padding: 10px;
}
</style>
