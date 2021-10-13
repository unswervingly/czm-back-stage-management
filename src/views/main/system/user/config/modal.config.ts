import { IForm } from '../../../../../base-ui/form/index'

// 整合到一起
export const modalConfig: IForm = {
  // 传入的参数和类型
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '用户名密码',
      placeholder: '请输入用户名密码',
      isHidden: true
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    }
  ],

  // 样式
  itemStyle: {},

  // 响应式布局
  colLayout: {
    span: 24
  }
}
