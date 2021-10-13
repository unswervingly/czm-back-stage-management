<template>
  <div class="user">
    <!-- 所有属性一个一个定义的 -->
    <!-- <czm-form
        :formItems="formItems"
        :labelWidth="labelWidth"
        :itemStyle="itemStyle"
        :colLayout="colLayout"
      /> -->

    <!-- 所有属性整合一起 + 双向绑定-->
    <!-- <czm-form v-bind="searchFormConfig" :formData="formData" /> -->

    <!-- 所有属性整合一起 + v-model的使用可以避免违反了单向数据流-->
    <!-- <czm-form v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h1>高阶检索</h1>
        </template>

        <template #footer>
          <div class="handle-btns">
            <el-button icon="el-icon-refresh">重置</el-button>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </div>
        </template>
      </czm-form>
      -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />

    <!-- 使用表格 展示内容 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />

    <!-- 使用弹窗组件，会有弹窗 -->
    <page-modal
      :modalConfig="modalConfigComputed"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../../../../store'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { PageSearch } from '../../../../components/page-search/index'
import { PageContent } from '../../../../components/page-content/index'
import { PageModal } from '../../../../components/page-modal/index'

import { usePageSearch } from '../../../../hooks/usePageSearch'
import { usePageModal } from '../../../../hooks/usePageModal'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 搜索和重置
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )

      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )

      passwordItem!.isHidden = true
    }

    // 2.动态添加部门和角色列表,注意 store是异步请求所以要用computed 返回更新后的配置内容
    const store = useStore()
    // 当数据变化时，通过computed改变并且返回modalConfig 来让页面是刷新
    const modalConfigComputed = computed(() => {
      // 使用find是引用modalConfig，不会是一个新的对象
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map(
        (departmentitem) => {
          return { title: departmentitem.name, value: departmentitem.id }
        }
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((roleitem) => {
        return { title: roleitem.name, value: roleitem.id }
      })

      // 引用不会是一个新的对象 返回更新后的配置内容
      return modalConfig
    })

    // 3.调用hook获取公共变量和函数
    // 新建和编辑的点击是否显示弹窗，点击编辑的按钮弹窗 内容就会把我编辑的内容给到弹窗里面
    const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,

      pageContentRef,
      handleResetClick,
      handleQueryClick,

      // modalConfig,
      modalConfigComputed,

      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped>
/* .header {
  color: pink;
}

.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
} */

/* .content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
} */
</style>
