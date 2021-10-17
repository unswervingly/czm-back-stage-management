import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

// 注册中国地图
import chinaJson from '../data/china.json'
echarts.registerMap('china', chinaJson)

export function useEcharts(el: HTMLElement, theme = 'light') {
  // 初始化echarts
  const echartsInstance = echarts.init(el, theme, { renderer: 'svg' })

  // 设置options
  const setOptions = (options: EChartsOption) => {
    echartsInstance.setOption(options)
  }

  // 对浏览器进行监听，使得echarts图形，可以进行调整 即响应式的
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })

  // 监听window尺寸的变化
  const updateResize = () => {
    echartsInstance.resize()
  }

  return {
    echartsInstance,
    setOptions,
    updateResize
  }
}
