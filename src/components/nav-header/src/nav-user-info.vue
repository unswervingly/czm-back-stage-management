<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://img0.baidu.com/it/u=2156733317,4289604811&fm=26&fmt=auto"
        ></el-avatar>
        <!-- <span>{{ name }}</span> -->
        <span class="user-name">CZM</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            icon="el-icon-circle-close"
            @click="handleExitClick"
          >
            退出登录
          </el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../../store/index'

import localCache from '../../../utils/cache'

export default defineComponent({
  name: 'NavUserInfo',
  setup() {
    // 1.获取登录时你登录的用户名
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    // 点击退出登录的逻辑
    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCache('token')
      localCache.deleteCache('userInfo')
      localCache.deleteCache('userMenus')
      router.push('/main')
    }

    return {
      name,

      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    .user-name {
      padding-left: 10px;
    }
  }
}
</style>
