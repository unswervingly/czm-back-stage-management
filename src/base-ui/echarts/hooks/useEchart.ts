import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 对浏览器进行监听，使得echarts图形，可以进行调整 即响应式的
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  // 有的可能不是浏览器的触发，所以要自己调用
  const updateResize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    updateResize
  }
}
