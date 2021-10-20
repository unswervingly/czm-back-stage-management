import { IForm } from '../../../../../base-ui/form/index'

// 整合到一起
export const searchFormConfig: IForm = {
  // 传入的参数和类型
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '故事标题',
      placeholder: '请输入故事标题'
    },

    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],

  // label宽度
  labelWidth: '120px',

  // 样式
  itemStyle: { padding: '10px 40px' },

  // 响应式布局
  colLayout: { span: 8 }
}
