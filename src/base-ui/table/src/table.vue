<template>
  <div class="czm-table">
    <!-- 表格头部信息 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>

        <div class="handler">
          <slot name="header-headler"></slot>
        </div>
      </slot>
    </div>

    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 表格的多选框 点击会触发el-table的@selection-change事件-->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <!-- 表格的序号 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 表格的其他属性 -->
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!-- 使用作用域插槽，实现我们想要哪个列数据的变换 -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- scope.row获取到每一行数据 这里是插槽的默认值 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 表格底部信息 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer-headler">
        <el-pagination
          :current-page="currentPage.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="currentPage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CzmTable',
  props: {
    // 展示该页面的名称 即侧边栏的名称
    title: {
      type: String,
      default: ''
    },
    // 从vuex的 system中获取数据
    listData: {
      type: Array,
      required: true
    },
    // 从vuex的 system中获取数据的数量
    listCount: {
      type: Number,
      default: 0
    },
    // 控制分页器数据显示几条和页数
    currentPage: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    // 展示的是表格头部信息
    propList: {
      type: Array,
      required: true
    },
    // 是否显示序号
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否显示多选框
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // el-table两个控制 展示的数据是展开
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 分页器是否显示
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:currentPage'],
  setup(props, { emit }) {
    // 点击多选框 会触发el-table的@selection-change事件
    const handleSelectionChange = (value: any) => {
      console.log('点击多选框', value)
      emit('selectionChange', value)
    }

    // 会触发el-pagination事件
    const handleSizeChange = (pageSize: number) => {
      console.log('点击分页', pageSize)
      emit('update:currentPage', { ...props.currentPage, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:currentPage', { ...props.currentPage, currentPage })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
