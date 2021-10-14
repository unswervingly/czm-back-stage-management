import { IForm } from '../../../../../base-ui/form/index'

// 整合到一起
export const modalConfig: IForm = {
  // 传入的参数和类型
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],

  // 样式
  itemStyle: {},

  // 响应式布局
  colLayout: {
    span: 24
  }
}
