type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  label: string
  placeholder?: any
  rules?: any[]
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
}

// 整合到一起
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: String
  itemStyle?: any
  colLayout?: any
}
