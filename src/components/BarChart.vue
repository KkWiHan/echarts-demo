<template>
  <div>
    <div ref="chartContainer" style="width: 100%;height: 500px; background: gray;">
    </div>
  </div>

</template>

<script>
import * as echarts from 'echarts'

/**
 * @description 当数据柱子很细的时候，才考虑加一个背景柱，不然直接series配置showBackground
 * @description x轴的第二排百分比是通过label的\n换行实现的
 */

export default {
  name: 'BarChart',
  data() {
    return {}
  },
  props: {
    chartData: {
      type: Object,
      default: () => ({
        unity: '万栋',
        //原数据在-后面加上\n换行
        data: [
          {
            name: "1980年以前",
            value: 178,
            percent: 2.78,
            unity: "%"
          },
          {
            name: "1981-1990年",
            value: 180,
            percent: 16.94,
            unity: "%"
          },
          {
            name: "1991-2000年",
            value: 190,
            percent: 38.13,
            unity: "%"
          },
          {
            name: "2001-2010年",
            value: 195,
            percent: 29.47,
            unity: "%"
          },
          {
            name: "2011-2015年",
            value: 115,
            percent: 7.75,
            unity: "%"
          },
          {
            name: "2016年及以后",
            value: 123,
            percent: 4.93,
            unity: "%"
          }
        ],
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          top: "20%",
          containLabel: true,
        }
      })
    },
  },
  methods: {
    initChart() {
      let bar = echarts.init(this.$refs.chartContainer)
      // x轴数据
      let xData = []
      let barData = []
      let percentData = []
      //转换rem
      let scale = 14
      // y轴名称
      let yAxisName = this.chartData.unity
      this.chartData.data.forEach(item => {
        xData.push(item.name)
        barData.push(item.value)
        percentData.push(item.percent)
      })

      let option = {
        grid: this.chartData.grid,
        xAxis: [
          {
            /*            name: '年份',
                        nameTextStyle:{
                          color: '#fff',
                          fontWeight: 500,
                          padding:[0, 0, 0, -10]
                        },*/
            type: 'category',
            data: xData,
            axisLabel: {
              interval: 0,
              fontWeight: 500,
              fontSize: 1.02 * scale,
              color: 'rgba(255,255,255,0.80)',
              formatter(params, index){
                return `${params}\n\n${percentData[index]}%`
              }
            },
            // 坐标轴刻度
            axisTick: {
              show: false
            },
            // 坐标轴线
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: yAxisName,
            nameTextStyle: {
              color: '#94aabd',
              fontSize: '1.14rem',
              fontWeight: 400,
              padding: [0, 0, 10, 0]
            },
            axisLabel: {
              fontWeight: 500,
              fontSize: 1.14 * scale,
              color: 'rgba(255,255,255,0.80)',
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(255,255,255,0.12)'
              }
            }
          }],
        series: [
          {
            type: 'bar',
            data: barData,
            //柱子宽度
            barWidth: 0.43 * scale,
            barGap: -3.5,
            //柱子色彩
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1, [{
                    offset: 0,
                    color: '#71abf7'
                  },
                    {
                      offset: 0.5,
                      color: '#027eff'
                    },
                    {
                      offset: 1,
                      color: '#0286ff'
                    }
                  ]
              )
            },
            //悬浮在柱子上变色
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            // 柱子上的标签
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            }
          },
          {
            name: '背景',
            type: 'bar',
            silent: true,
            // barWidth: 3.71 * 14,
            barWidth: 2.8 * 14,  // 调整宽度会影响到上面柱子的barGap
            data: [0, 0, 0, 0, 0, 0],
            itemStyle: {
              normal: {
                color: 'rgba(255,255,255,0.10)'
              }
            },
          }
        ]
      }
      bar.setOption(option)

      // 获取y轴最大值
      const maxValue = bar.getModel().getComponent('yAxis').axis.scale.getExtent()[1];
      //用最大值渲染背景槽长度
      const bacValue = new Array(6).fill(maxValue + 40);

      // 用新的选项再次设置图表
      let bacBar = option.series.find(item => item.name === '背景')
      if (bacBar) {
        bacBar.data = bacValue
      }
      bar.setOption(option)
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>


<style scoped>

</style>
