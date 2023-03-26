import { useRef, useEffect } from "react"
import * as echarts from 'echarts'

//封装图标bar组件
function Bar ({ title, xData, yData, style }) {

  const domRef = useRef()

  const echartsInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: yData
        }
      ]
    })
  }

  useEffect(() => {
    echartsInit()
  })
  return (
    <div>
      <div ref={domRef} style={style}>
      </div>
    </div>
  )
}

export default Bar