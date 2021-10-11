import { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

export default function registerProperTies(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    // 对时间数据的转换
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
