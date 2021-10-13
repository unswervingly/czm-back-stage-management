<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span
            ><el-icon style="vertical-align: middle">
              <user-filled />
            </el-icon>
            <span style="vertical-align: middle"> 账号登录</span>
          </span>
        </template>

        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span
            ><el-icon style="vertical-align: middle">
              <cellphone />
            </el-icon>
            <span style="vertical-align: middle"> 手机登录</span>
          </span>
        </template>

        <login-phone ref="phonetRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立刻登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
  name: 'loginPanel',
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    // 1.定义记住密码属性
    const isKeepPassword = ref(true)
    // InstanceType<typeof loginAccount> 拿到 loginAccount组件导出的类型
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const phonetRef = ref<InstanceType<typeof loginPhone>>()
    // v-model 所选选项卡的名称
    const currentTab = ref('account')

    // 2.定义立即登录方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phonetRef')
      }
    }

    return {
      isKeepPassword,
      accountRef,
      phonetRef,
      currentTab,

      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
