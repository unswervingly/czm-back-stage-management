<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import { ElForm } from 'element-plus'
// 封装的编写验证规则
import { rules } from '../config/account-config'
// 封装的本地缓存
import localCache from '../../../utils/cache'

export default defineComponent({
  name: 'loginAccount',
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      // validate 就是验证，里面是回调函数返boolean类型，true就是验证成功
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
            // account.name = ''
            // account.password = ''
          }

          // 2.开始进行登录验证
          // account是响应式对象，所以要用{...account}
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    // 可以封装出去
    // 编写验证规则 校验规则参见 async-validator库
    /*  const rules = {
      name: [
        {
          required: true,
          message: '用户名是必须传递的内容',
          trigger: 'blur'
        },
        {
          patter: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5~10个字母或者数字',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码是必须传递的内容',
          trigger: 'blur'
        },
        {
          patter: /^[a-z0-9]{3,}$/,
          message: '密码必须是3位以上的字母或者数字',
          trigger: 'blur'
        }
      ]
    }
    */

    return {
      account,
      rules,

      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
