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
        <el-button v-if="isCreate" size="medium" type="primary"
          >新建用户</el-button
        >
      </template>

      <!-- 2.列中的插槽 -->
      <!-- 下面是四个插槽是全部页面都有，所以不用动态设置 -->
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
          <el-button
            v-if="isUpdata"
            icon="el-icon-edit"
            class=""
            size="mini"
            type="text"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 比如 goods特有的插槽 所有要放到goods组件里面，不能在这里使用-->
      <!-- 我们可以动态创建插槽来接受外面的插槽，进而传递到table.vue中的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <!-- 3.footer中的插槽 -->
    </czm-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '../../../store/index'

import { CzmTable } from '../../../base-ui/table/index'

import { usePermission } from '../../../hooks/usePermission'

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

    // 1.获取操作的权限
    // 创建权限
    const isCreate = usePermission(props.pageName, 'create')
    // 编辑权限
    const isUpdata = usePermission(props.pageName, 'updata ')
    // 删除权限
    const isDelete = usePermission(props.pageName, 'delete')
    // 查询权限
    const isQuery = usePermission(props.pageName, 'query')

    // 2.分页操作  双向绑定pageInfo  currentPage是第几个页 pageSize是请求数据数量
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    // 根据watch 来监听pageInfo是否改变，重新调用网络请求
    watch(pageInfo, () => getPageData())

    // 3.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return

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

    // 4.从vuex中获取数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )

    // 从vuex中获取数据的数量
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 5.从配置文件content.config.ts中 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    return {
      isCreate,
      isUpdata,
      isDelete,

      getPageData,
      dataList,

      pageInfo,
      dataCount,

      otherPropSlots
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
