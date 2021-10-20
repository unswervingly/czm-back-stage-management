<template>
  <div class="list">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="list"
      ref="pageContentRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { PageSearch } from '../../../../components/page-search/index'
import { PageContent } from '../../../../components/page-content/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '../../../../hooks/usePageSearch'

export default defineComponent({
  name: 'list',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,

      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped></style>
