<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      @click="handleFoldClick"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
    ></i>

    <div class="content">
      <!-- 面包屑 -->
      <czm-breadcrumb :breadcrumbs="breadcrumbs" />

      <!-- 用户信息 -->
      <nav-user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../../../store/index'

import NavUserInfo from './nav-user-info.vue'
import { CzmBreadcrumb } from '../../../base-ui/breadcrumb/index'

import { pathMapBreadcrumbs } from '../../../utils/map-menus'

export default defineComponent({
  name: 'NavHeader',
  components: {
    NavUserInfo,
    CzmBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    // 面包屑的数据 [{name: ,path:},{name: ,path:}]
    const breadcrumbs = computed(() => {
      const useMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(useMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,

      name,

      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
