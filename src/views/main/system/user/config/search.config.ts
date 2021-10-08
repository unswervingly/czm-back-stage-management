import { IForm } from '../../../../../base-ui/form/index'

// 整合到一起
export const searchFormConfig: IForm = {
  // 传入的参数和类型
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入ID'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      options: [
        {
          title: '篮球',
          value: 'basketball'
        },
        {
          title: '跑步',
          value: 'run'
        }
      ]
    },
    {
      field: 'createTime',
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
  labelWidth: '120px'

  // 样式
  // itemStyle: {
  //   padding: '20px 60px'
  // },

  // 响应式布局
  // colLayout: {
  //   span: 8
  // }
}
