<template>
    <div style="width: 100%;height: 500px; background: gray;" ref="lineChart"></div>
  </template>
  
  <script>
  /**
   * @Author: zc
   * @Date: 2023-10-10
   * @Description: 堆叠的柱状图
   */
  import * as echarts from "echarts";
  
  export default {
    name: "StackBarChart",
    props: {
      /**
       * unit: 单位
       * color: 柱体颜色
       * xAxisData: X轴标签
       * yAxisData: Y轴数据，数组第一维在堆叠柱体的最下方
       * labelData: 柱体上方的标签
       * legendData: 图例，数组第一个元素表示 yAxisData 数据数组第一维的数据名字，以此类推。不需要图例，则设为 ''。
       */
      chartData: {
        type: Object,
        default: () => ({
          unit: "个",
          color: ['#d45257', '#59cc7d', '#68c9d3', '#cde3fb', '#59cc7d', '#d08752', '#7b6bdf'],
          xAxisData: ['南京', '无锡', '徐州', '常州', '苏州', '南通', '扬州', '连云港', '淮安', '盐城', '镇江', '泰州', '宿迁'],
          yAxisData: [
            [130, 105, 135, 120, 175, 205, 185, 195, 208, 205, 185, 195, 208],
            [30, 95, 95, 90, 95, 95, 95, 95, 108, 95, 155, 125, 118]
          ],
          labelData: ['90%', '80%', '85%', '80%', '90%', '80%', '85%', '80%', '90%', '80%', '85%', '80%', '80%'],
          legendData: ['隐患房屋', '整治销号'],
        })
      }
    },
    watch: {
      chartData: {
        handler: function () {
          this.initCharts()
        },
        deep: true
      }
    },
    methods: {
      initCharts() {
        let line = echarts.init(this.$refs.lineChart);
        let trafficWay = this.chartData;
        // 图例数据
        let legendData = this.chartData.legendData;
        // X轴标签
        let xAxisData = this.chartData.xAxisData;
        if (typeof (xAxisData) == "undefined") {
          xAxisData = ['南京', '无锡', '徐州', '常州', '苏州', '南通', '扬州', '连云港', '淮安', '盐城', '镇江', '泰州', '宿迁'];
        }
        // 柱子颜色
        let color = this.chartData.color;
        if (typeof (color) == "undefined") {
          color = ['#e9bd4b', '#4d97f1', '#68c9d3', '#cde3fb', '#59cc7d', '#d08752', '#7b6bdf'];
        }
        // 柱体数据
        let data = [];
        for (let i = 0; i < trafficWay.yAxisData.length; i++) {
          console.log(i);
          let temp = {}
          if (i === trafficWay.yAxisData.length - 1) {
            temp = {
              name: legendData[i],
              type: 'bar',
              // stack: 'Ad',
              data: trafficWay.yAxisData[i],
              color: color[i],
              barWidth: '30%',
              barGap: '-100%',
              markPoint: {},
            };
            // 柱体上的标签
            let markPointData = [];
            for (let j = 0; j < trafficWay.yAxisData[i].length; j++) {
              // 柱体上方标签在X轴上的位置
              let x = trafficWay.xAxisData[j];
              // 柱体上方标签在Y轴上的位置
              let y = trafficWay.yAxisData[i - 1][j];
              let label = trafficWay.labelData[j];
              markPointData.push({
                coord: [x, y], //例如['南京', 30]
                value: label,
                label: {
                  color: 'rgba(255,255,255,0.80)',
                  fontSize: '1.14rem',
                  fontWeight: 500,
                  fontFamily: 'Source Han Sans CN, Source Han Sans CN-500',
                  offset: [0, -2]  //气泡内文字的偏移
                },
                symbol: 'pin', //类似对话框的气泡效果，可选项有'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                // symbolSize: [80, 80],
                symbolSize: [0, 0],
                symbolOffset : [0, -10] //气泡的偏移
              });
            }
            temp.markPoint.data = markPointData;
          }
          else {
            temp = {
              name: legendData[i],
              type: 'bar',
              // stack: 'Ad',
              data: trafficWay.yAxisData[i],
              color: color[i],
              barWidth: '30%',
              markPoint: {},
            };
          }
          data.push(temp);
        }
        console.log(data);
        // 参数配置
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            icon:'roundRect', //图例色块的样式，可选'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none', 'line', 'square',用阿里的svg图标库可以像原生一样切换颜色
            selectedMode: false,  //图例的点击事件，可选boolean和single、multiple
            
            right: '4%',
            top: '7%',
            // data: legendData,
            textStyle: {
              color: '#94aabd',
              fontSize: '1.14rem',
              fontWeight: 400
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              // boundaryGap: false,
              interval: 0,
              data: xAxisData,
              axisLabel: {
                interval: 0,
                color: 'rgba(255,255,255,0.80)',
                fontSize: '1.14rem',
                fontWeight: 500,
                fontFamily: 'Source Han Sans CN, Source Han Sans CN-500',
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: this.chartData.unit,
              nameTextStyle: {
                color: 'rgba(255,255,255,0.80)',
                fontSize: '1.14rem',
                fontWeight: 400,
                fontFamily: "Source Han Sans CN, Source Han Sans CN-350",
                align: "right",
                padding: [0, 3, 0, 0]
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255,255,255,0.40)',
                  type: 'dashed'
                }
              },
              axisLabel: {
                color: 'rgba(255,255,255,0.80)',
                fontSize: '1.14rem',
                fontWeight: 500,
                fontFamily: 'Source Han Sans CN, Source Han Sans CN-500',
              },
            }
          ],
          series: data
        };
  
        line.setOption(option, true);
      },
    },
    mounted() {
      this.initCharts();
    },
  }
  </script>
  
  <style scoped>
  </style>
  