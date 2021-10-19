import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 },
  title: '新建商品名称'
}
