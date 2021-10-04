// 编写验证规则 校验规则参见 async-validator库
export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必须传递的内容',
      trigger: 'blur'
    },
    {
      patter: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必须传递的内容',
      trigger: 'blur'
    },
    {
      patter: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}
