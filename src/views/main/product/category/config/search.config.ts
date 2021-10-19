import { IForm } from '../../../../../base-ui/form/index'

// 整合到一起
export const searchFormConfig: IForm = {
  // 传入的参数和类型
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品类别名称',
      placeholder: '请输入商品类别名称'
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
  labelWidth: '100px',
  itemStyle: { padding: '10px 40px' },
  colLayout: { span: 8 }
}
