<template>
  <div class="page-content">
    <czm-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:currentPage="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #header-headler>
        <el-button size="medium" type="primary">新建用户</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>

      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>

      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>

      <template #handler>
        <div class="handler-btns">
          <el-button icon="el-icon-edit" class="" size="mini" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 3.footer中的插槽 -->
    </czm-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '../../../store/index'

import { CzmTable } from '../../../base-ui/table/index'

export default defineComponent({
  name: 'PageContent',
  components: {
    CzmTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageUrl: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从vuex中获取数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )

    // 分页操作  双向绑定pageInfo  currentPage是第几个页 pageSize是请求数据数量
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    // 根据watch 来监听pageInfo是否改变，重新调用网络请求
    watch(pageInfo, () => getPageData())

    // 从vuex中获取数据的数量
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    return {
      getPageData,
      dataList,

      pageInfo,
      dataCount
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
