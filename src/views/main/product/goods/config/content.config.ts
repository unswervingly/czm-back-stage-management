export const contentTableConfig = {
  // userList里面数据展开
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '80', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
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
  title: '商品信息',

  // 是否显示表格的序号
  showIndexColumn: true,

  // 是否显示表格的多选框
  showSelectColumn: true
}