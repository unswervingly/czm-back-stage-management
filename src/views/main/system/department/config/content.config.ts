export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '部门名称', minWidth: '120' },
    { prop: 'leader', label: '部门领导', minWidth: '120' },
    { prop: 'parentId', label: '上级部门', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],

  // 显示表格的头部名称
  title: '部门列表',

  // 是否显示表格的序号
  showIndexColumn: true,

  // 是否显示表格的多选框
  showSelectColumn: true,

  // 点击右边的按钮的名称
  newBtnTitle: '新建数据'
}
