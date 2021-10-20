<template>
  <div class="chat">
    <czm-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { CzmEditor } from '../../../../base-ui/editor/index'

export default defineComponent({
  name: 'chat',
  components: {
    CzmEditor
  },
  setup() {
    const htmlString = ref<string>('愿你走出半生，归来仍是少年。')

    return {
      htmlString
    }
  }
})
</script>

<style scoped>
.chat {
  margin-top: 20px;
}
</style>
