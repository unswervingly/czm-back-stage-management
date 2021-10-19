<template>
  <div class="category">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />

    <page-content
      ref="pageContentRef"
      pageName="category"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />

    <!-- 使用弹窗组件，会有弹窗 -->
    <page-modal
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="category"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { PageSearch } from '../../../../components/page-search/index'
import { PageContent } from '../../../../components/page-content/index'
import { PageModal } from '../../../../components/page-modal/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '../../../../hooks/usePageSearch'
import { usePageModal } from '../../../../hooks/usePageModal'

export default defineComponent({
  name: 'category',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal()

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,

      pageContentRef,
      handleResetClick,
      handleQueryClick,

      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
