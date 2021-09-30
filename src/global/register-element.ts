import { App } from 'vue'
// element-plus 局部引入
// 1.要安装 npm install babel-plugin-import -D 在 babel.config.js中配置
// 2. 下面操作
import { ElButton } from 'element-plus'

const components = [ElButton]

export default function (app: App): void {
  // 3. 全局注册组件
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
