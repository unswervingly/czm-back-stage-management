<template>
  <div class="user-info">
    <div class="info">
      <el-dropdown>
        <!-- 用户名和头像 -->
        <span class="el-dropdown-link">
          <el-avatar
            size="small"
            class="avatar"
            src="https://img0.baidu.com/it/u=2156733317,4289604811&fm=26&fmt=auto"
          ></el-avatar>
          <!-- <span>{{ name }}</span> -->
          <span class="user-name">CZM</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>

        <!-- 下来菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              icon="el-icon-circle-close"
              @click="handleExitClick"
            >
              退出登录
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-info" divided
              >个人信息</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-unlock">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 用户的消息通知等 -->
    <div class="operation">
      <span>
        <i class="el-icon-bell"></i>
      </span>
      <span>
        <i class="el-icon-chat-dot-round"></i>
      </span>
      <span>
        <span class="dot"></span>
        <i class="el-icon-postcard"></i>
      </span>
    </div>
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
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    .avatar {
      width: 30px;
      height: 30px;
    }
    .user-name {
      padding-left: 10px;
    }
  }

  .operation {
    margin-right: 20px;

    span {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 35px;
      line-height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 3px;
      }
    }
  }
}
</style>
