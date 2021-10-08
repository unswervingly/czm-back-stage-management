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
          <el-dropdown-item icon="el-icon-circle-close"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavUserInfo',
  setup() {
    return {}
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
