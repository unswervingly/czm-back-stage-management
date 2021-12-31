type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  placeholder?: any
  rules?: any[]
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  // 判断我配置文件中formItems里面是否在el-form-item显示,
  isHidden?: boolean
}

// 整合到一起
export interface IForm {
  formItems: IFormItem[]
  title?: string
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
  // newBtnTitle?: String
}
