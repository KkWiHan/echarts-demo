<template>
  <div>
    <div ref="pie3DChart" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script>
// import echarts from 'echarts';
import * as echarts from "echarts"
import 'echarts-gl';

export default {
  name: 'Pie3DChart',
  data() {
    return {
      chartInstance: null,
      pieData: [
        {
          name: '上海',
          value: 134,
          unity: '万栋',
          itemStyle: {
            color: '#99D3F3',
          },
        },
        {
          name: '北京',
          value: 156,
          unity: '万栋',
          itemStyle: {
            color: '#007AFF',
            opacity: 1
          },
        },
        {
          name: '深圳',
          value: 127,
          unity: '万栋',
          itemStyle: {
            color: '#2acf81',
            opacity: 1
          },
        },
        {
          name: '南京',
          value: 150,
          unity: '万栋',
          itemStyle: {
            color: '#1F9AA7',
            opacity: 1
          },
        },
        {
          name: '武汉',
          value: 110,
          unity: '万栋',
          itemStyle: {
            color: '#F5B64C',
            opacity: 1
          },
        },
      ],
      internalDiameterRatio: 0.7 //饼宽度
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.pie3DChart);
      this.updateChart();
    },
    updateChart() {
      let chart = this.chartInstance
      let option = this.getPie3D(this.pieData, this.internalDiameterRatio);
      chart.setOption(option);
      // // 添加鼠标悬浮事件监听
      // chart.on('mouseover', function (params) {
      //     chart.dispatchAction({
      //         type: 'highlight',
      //         seriesName: params.seriesName
      //     });
      // });

      // // 添加鼠标移出事件监听
      // chart.on('mouseout', function (params) {
      //     chart.dispatchAction({
      //         type: 'downplay',
      //         seriesName: params.seriesName
      //     });
      // });
    },
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData = [];
      let k =
          typeof internalDiameterRatio !== 'undefined'
              ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
              : 1 / 3;
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;

        let seriesItem = {
          name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
          type: 'surface',
          parametric: true,
          wireframe: {
            show: false,
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: 1 / 10,
          },
        };
        if (typeof pieData[i].itemStyle != 'undefined') {
          let itemStyle = {};
          typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
          typeof pieData[i].itemStyle.opacity != 'undefined'
              ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
              : null;

          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;

        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = this.getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
        );

        startValue = endValue;

        legendData.push(series[i].name);
      }

      let option = {
        backgroundColor: '#163561',
        tooltip: { //鼠标悬浮的提示框，通过name匹配
          trigger: 'item',
          formatter: function (params) {
            let item = pieData.find(dataItem => dataItem.name === params.seriesName);
            if (item) {
              return `${item.name}:${item.value}${item.unity}`;
            } else {
              return params.seriesName;
            }
          },
          //更详细定制示例
          /*                  formatter: (params) => {
                              if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
                                const bfb = ((option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio) * 100).toFixed(2)
                                return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` + `${params.seriesName}<br/>` + '数值：' + option.series[params.seriesIndex].pieData.value + '万吨<br/>' + '占比：' + `${bfb}%`
                              }
                            }*/
        },
        legend: {
          textStyle: {
            color: '#FFFFFF',
            fontSize: 18,
          },
          data: legendData,
          formatter: (params) => {
            return params;
          },
        },
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        grid3D: {
          viewControl: {
            //设置y初始视角
            alpha: 25,
            //设置x初始视角
            // beta: 20,

            //自动旋转
            autoRotate: false,
            //旋转速度
            autoRotateSpeed: 20,
            //拖动后自动旋转会失效，设置失效重新旋转的时间
            autoRotateAfterStill: 3,

            //拖动惯性
            // damping: 0.9,

            //[1, 0]只能横向旋转, [0, 1]只能纵向旋转, 0无法旋转
            rotateSensitivity: [1, 1],
            // 缩放操作的灵敏度，值越大越灵敏。默认为1。设置为0后无法缩放。
            zoomSensitivity: 1,
            //平移操作的灵敏度。支持使用数组分别设置横向和纵向的平移。灵敏度默认为1。设置为0后无法平移。
            panSensitivity: 0,
            //平移的触发按键 'left', 'middle', 'right'
            // panMouseButton: 'left',

            //旋转的触发按键
            // rotateMouseButton: 'left',

            //距离中心原点的距离
            distance: 200,

            // 动画的开启，时间，类型
            // animation: true,
            // animationDurationUpdate: 1000,
            // animationEasingUpdate: 'cubicInOut'
          },
          left: 'center',
          width: '50%',
          show: false, //3d网格线的展示
          boxHeight: 20,
        },
        series: series,
      };
      return option;
    },
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      // 计算
      let midRatio = (startRatio + endRatio) / 2;

      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;
      isSelected = false;
      k = typeof k !== 'undefined' ? k : 1 / 3; //空环大小
      let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let hoverRate = isHovered ? 1.05 : 1;
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },

        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },

        x: function (u, v) {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y: function (u, v) {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;

          
        },

        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * h * 0.1;
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        },
      };
    }
  },
  watch: {
    pieData: {
      deep: true,
      handler() {
        this.updateChart();
      }
    },
    internalDiameterRatio() {
      this.updateChart();
    }
  }
};
</script>

<style scoped>
/* 根据需要添加样式 */
</style>
