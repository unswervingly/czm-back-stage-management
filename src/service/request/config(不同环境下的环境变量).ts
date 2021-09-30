// 有三种环境
// 开发环境: development
// 生成环境: production
// 测试环境: test

// 1.方式一: 手动的切换不同的环境(不推荐)
// const BASE_URL = 'http://czm.org/dev'
// const BASE_NAME = 'czm'

// const BASE_URL = 'http://czm.org/prod'
// const BASE_NAME = 'clm'

// const BASE_URL = 'http://czm.org/test'
// const BASE_NAME = 'clm_520'

// 2.方式二：根据process.env.NODE_ENV区分
// 开发环境: process.env.NODE_ENV === development
// 生成环境: process.env.NODE_ENV === production
// 测试环境: process.env.NODE_ENV === test

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://czm.org/dev'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://czm.org/prod'
} else {
  BASE_URL = 'http://czm.org/test'
}

export { BASE_URL, TIME_OUT }

// 3.方式三：在目录下创建
// .env.development、.env.production、.env.test 文件 一样要这三个文件名称
// 里面定义的名称是固定的，可以 使用 VUE_APP_随便写 来自定义
// 在ts文件中，用不了 想要去 shims-vue.d.ts文件申明
// 获取是  process.env.定义的名称
