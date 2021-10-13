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
    />

    <!-- 使用弹窗组件，会有弹窗 -->
    <page-modal :modalConfig="modalConfig"></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { PageSearch } from '../../../../components/page-search/index'
import { PageContent } from '../../../../components/page-content/index'
import { PageModal } from '../../../../components/page-modal/index'

import { usePageSearch } from '../../../../hooks/usePageSearch'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,

      pageContentRef,
      handleResetClick,
      handleQueryClick,

      modalConfig
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
