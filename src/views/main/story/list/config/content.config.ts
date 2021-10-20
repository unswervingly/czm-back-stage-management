export const contentTableConfig = {
  propList: [
    { prop: 'title', label: '故事标题', minWidth: '120' },
    { prop: 'content', label: '我的故事', minWidth: '300' },
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
  title: '故事列表',

  // 是否显示表格的序号
  showIndexColumn: true,

  // 是否显示表格的多选框
  showSelectColumn: true,

  // 点击右边的按钮的名称
  newBtnTitle: '新建故事'
}
