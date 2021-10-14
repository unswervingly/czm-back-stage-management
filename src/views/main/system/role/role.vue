<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>

    <page-modal
      :modalConfig="modalConfig"
      pageName="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <el-tree
        :data="menus"
        show-checkbox
        ref="elTreeRef"
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import { useStore } from '../../../../store/index'
import { ElTree } from 'element-plus'

import { PageSearch } from '../../../../components/page-search/index'
import { PageContent } from '../../../../components/page-content/index'
import { PageModal } from '../../../../components/page-modal/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '../../../../hooks/usePageModal'

import { getMenuLeafKeys } from '../../../../utils/map-menus'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = getMenuLeafKeys(item.menuList)
      // 调用editCallback，elTreeRef.value还没有绑定到el-tree组件对象上面,使用nextTick来解决
      console.log(elTreeRef.value) // undefined
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal(undefined, editCallback)

    // 得到所有的菜单数据
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    // 保存 我点击了el-tree的多选框是哪些，并且传递给page-modal和page-modal传递给form的数据一起发给服务器
    const otherInfo = ref({})
    // 点击el-tree的多选框，会发出一个@check事件，会拿到我选中的 放到otherInfo
    const handleCheckChange = (data1: any, data2: any) => {
      // console.log(data1, data2)
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      // menuList是数组，otherInfo是对象 所以要{ menuList }
      otherInfo.value = { menuList: menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,

      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,

      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
