export const contentTableConfig = {
  // userList里面数据展开
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '120' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '150' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '160',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '160',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],

  // 显示表格的头部名称
  title: '菜单列表',

  // 是否显示表格的序号
  showIndexColumn: false,

  // 是否显示表格的多选框
  showSelectColumn: false,

  // 是否表格el-table 展示的数据是展开
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },

  // 是否展示分页器
  showFooter: false
}
