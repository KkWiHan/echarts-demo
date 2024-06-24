<template>
    <div style="width: 100%;height: 500px; background: gray;" ref="pieChart">
    </div>
  </template>

  <script>
  /**
   * @author
   * @date  2023/10/3
   * @description 饼图
   */

  import * as echarts from "echarts";

  export default {
    name: "pie-chart",
    data() {
      return {
        typeNum: 5,
        options: {
          circleCenter: ['20%', '50%'],
          circleRadius: ['55%', '56%'],
          graphicWidth: 70,
          graphicHeight: 70,
          graphicLeft: '15%',
          legendX: '30%',
          legendTextaWidth: 100,
          legendTextbWidth: 40,
          legendItemGap: 16,
          showBfb: true
        }
      }
    },
    props: {
      chartData: {
        type: Object,
        default:() => ({
          text: '',
          options: {
            // 外环位置和饼宽
            circleCenter: ['20%', '50%'],
            circleRadius: ['55%', '56%'],

            // 内环图片的长宽
            graphicWidth: 250,
            graphicHeight: 250,
            graphicLeft: '14.1%',

            legendX: '31%',  //图例距离canvas左边的距离
            //按顺序
            legendTextaWidth: 100,
            legendTextbWidth: 70,
            legendTextdwWidth: 60,
            legendTextcWidth: 38,
            legendItemGap: 18,

            showBfb: true,
            percentPadding: [0, 0, 0, 0], //蓝字
            dwPadding: [0, 0, 0, 0],// 单位
            pPadding: [0, 0, 0, 0] //百分号
          },
          // 分类的最大数目，超过此数则累加变为“其它”
          max: 5,
          color: ['#E9BD4B', '#4D97F1', '#68C9D3', '#CDE3FB', '#59CC7D', '#D08752', '#7B6BDF'],
          data: [
           {
              name: '砖石结构',
              value: 296,
              unity: '万栋',
              percentData: 10,
            },
            {
              name: '窑洞',
              value: 127,
              unity: '万栋',
              percentData: 10,
            },
            {
              name: '土木结构',
              value: 19,
              unity: '万栋',
              percentData: 20,
            },
            {
              name: '钢筋混凝土',
              value: 5.72,
              unity: '万栋',
              percentData: 10,
            },
            {
              name: '混杂结构',
              value: 0.8,
              unity: '万栋',
              percentData: 20,
            },
            {
              name: '钢结构',
              value: 4.72,
              unity: '万栋',
              percentData: 10,
            },
            {
              name: '其它',
              value: 10.72,
              unity: '万栋',
              percentData: 10,
            }
          ]
        })
      }
    },
    watch: {
      chartData() {
        this.initCharts();
      }
    },
    mounted() {
      this.initCharts();
    },
    methods: {
      initCharts() {
        //没有传的话初始化配置
        let { circleCenter, circleRadius, graphicWidth, graphicHeight, graphicLeft,
          legendX, legendTextaWidth, legendTextbWidth, legendTextcWidth, legendTextdwWidth, legendItemGap } = this.chartData.options;
          let color = this.chartData.color;
          let text = this.chartData.text;
        if (typeof (color) == "undefined") {
          color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];
        }
          if (typeof (circleCenter) == "undefined") {
          circleCenter = this.options.circleCenter;
        }
        if (typeof (circleRadius) == "undefined") {
          circleRadius = this.options.circleRadius;
        }
        typeof (graphicWidth) == "undefined" ? (graphicWidth = this.options.graphicWidth) : 1;
        typeof (graphicHeight) == "undefined" ? (graphicHeight = this.options.graphicHeight) : 1;
        typeof (graphicLeft) == "undefined" ? (graphicLeft = this.options.graphicLeft) : 1;
        typeof (legendX) == "undefined" ? (legendX = this.options.legendX) : 1;
        typeof (legendTextaWidth) == "undefined" ? (legendTextaWidth = this.options.legendTextaWidth) : 1;
        typeof (legendTextbWidth) == "undefined" ? (legendTextbWidth = this.options.legendTextbWidth) : 1;
        typeof (legendTextcWidth) == "undefined" ? (legendTextcWidth = this.options.legendTextcWidth) : 1;
        typeof (legendTextdwWidth) == "undefined" ? (legendTextdwWidth = this.options.legendTextdwWidth) : 1;
        typeof (legendItemGap) == "undefined" ? (legendItemGap = this.options.legendItemGap) : 1;
        let {showBfb} = this.chartData.options;
        if (typeof (showBfb) == "undefined") {
          showBfb = this.options.showBfb;
        }
        let { max } = this.chartData;
        if (typeof (max) == "undefined") {
          max = this.typeNum;
        }

        let scale = 14;
        let pie = echarts.init(this.$refs.pieChart, "", { renderer: "svg" });
        let img = require("../assets/images/bg/pic_bingtu@2x.png");

        let trafficWay = this.chartData.data;
        //大于最大分类数的话用trafficWay2进行汇总再赋给trafficWay
        if (trafficWay.length > max) {
          let trafficWay2 = [];
          //除开了'其它'进行排序，'其它'项就到结尾去了？没有'其它'项的话也不影响
          trafficWay.filter(item => item.name !== '其它').sort((a, b) => b.value - a.value);
          let othersValue = 0;
          let othersPercentValue = 0
          for (let i = (max - 1); i < trafficWay.length; i++) {
            othersValue += trafficWay[i].value;
            othersPercentValue += trafficWay[i].percentData
          }
          othersValue = parseFloat(othersValue.toFixed(2));
          trafficWay2 = trafficWay.slice(0, max - 1);

          trafficWay2.push({
            name: '其它  ',
            value: othersValue,
            percentData: othersPercentValue,
            unity: trafficWay2[0].unity
          })
          if (trafficWay2.length > 0) {
            trafficWay = trafficWay2;
          }
        }

        let legendData = [];
        for (let i = 0; i < trafficWay.length; i++) {
          legendData.push(trafficWay[i].name);
        }

        let data = [];
        //检测单位然后push进data
        for (var i = 0; i < trafficWay.length; i++) {
          if (typeof (trafficWay[i].unity) == "undefined") {
            trafficWay[i].unity = "万个";
          }
          //一个series配一个间隙
          data.push({
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            unity: trafficWay[i].unity,
            percentData: trafficWay[i].percentData,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i]
              }
            }
          },
            // 这就是一个series配的一个间隙（两个环中间会存在间隙）
            {
              // value: 2,
              value: 0,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  color: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(0, 0, 0, 0)',
                  borderWidth: 0
                }
              }
            }
          );
        }
        let seriesOption = [{
          name: '',
          type: 'pie',
          // 饼图的扇区是否是顺时针排布。
          clockWise: false,
          radius: circleRadius,
          center: circleCenter,
          // 饼柱子悬浮的放大动画效果
          hoverAnimation: false,
          itemStyle: {
            normal: {
              //指引线上的标签
              label: {
                show: false,
                position: 'outside',
                color: '#ddd',
                formatter: function (params) {
                  var percent = 0;
                  if (params.name !== '') {
                    return percent + '%';
                  } else {
                    return '';
                  }
                },
              },
              // 指引线
              labelLine: {
                length: 10,
                length2: 20,
                show: false,
                color: '#00ffff'
              }
            }
          },
          data: data
        }];
        let option = {
          color: color,
          // 背景设置
          graphic: {
            //内环（图片）
            elements: [{
              type: "image",
              style: {
                image: img,
                width: graphicWidth,
                height: graphicHeight
              },
              left: graphicLeft,
              top: 'center',
            },
            //图片中央的文字
            {
              type: 'text',// 类型，可以是文字、图片或其它类型
              left: '16%',
              top: 'center',
              style: {
                text: text,
                fill: '#ffffff', // 文字的颜色
                fontSize: 18
              }
            }]
          },
          tooltip: {
            show: true
          },
          legend: {
            type: 'scroll',
            orient: 'vertical', //图例垂直布局，可选horizontal
            align: 'left',
            x: legendX,
            y: 'center',
            itemWidth: 0.71 * scale,   // 设置图例图形的宽
            itemHeight: 0.71 * scale,  // 设置图例图形的高
            pageIconSize: 9,
            pageIconColor: '#fff',
            pageTextStyle: {
              color: '#fff',
              fontSize: 9
            },
            data: legendData, //['住宅', '非住宅']
            formatter: (name) => {
              let target;
              let unity;
              let blueNumber
              for (let i = 0; i < data.length; i++) {
                if (data[i].name != "") {
                  if (data[i].name === name) {
                    target = parseFloat(data[i].value);
                    unity = data[i].unity;
                    blueNumber = data[i].percentData
                  }
                }
              }
              if (isNaN(blueNumber)) {
                blueNumber = "--";
              }
              if (isNaN(target)) {
                target = "--";
              }
              let arr = [
                '{a|' + name + '}',
                '{b|' + target + '}',
                '{dw|' + unity + '}',
                showBfb ? '{c|' + blueNumber + '}{p|%}' : '',
              ]
              return arr.join('') //把数组转换为字符串'{a|砖石结构}{b|296}{dw|万个}{c|10}{p|%}'否则页面会展示出数组分隔的逗号
            },
            textStyle: {
              padding: [0, 0, 0, 0], //文字padding，只改这个和图例方块对应不上
              rich: {
                a: {
                  fontSize: 1.14 * scale,
                  fontWeight: 500,
                  fontFamily: 'Source Han Sans CN, Source Han Sans CN-500',
                  width: showBfb ? legendTextaWidth : legendTextaWidth + 60,
                  color: '#94aabd',
                },
                b: {
                  // fontSize: 1.1 * scale,
                  fontSize: 1.57 * scale,
                  fontWeight: 'bold',
                  fontFamily: 'D-DIN, D-DIN-700',
                  width: legendTextbWidth,
                  color: '#fff',
                },
                dw: {
                  fontSize: 1.14 * scale,
                  fontFamily: 'Source Han Sans CN, Source Han Sans CN-400',
                  fontWeight: 400,
                  color: '#94aabd',
                  width: legendTextdwWidth,
                  padding: this.chartData.options.dwPadding
                },
                c: {
                  // fontSize: 1.2 * scale,
                  fontSize: 1.57 * scale,
                  fontWeight: 'bold',
                  // color: 'url(#textGradient)',
                  fontFamily: 'D-DIN, D-DIN-700',
                  color: '#6DADEB',
                  width: legendTextcWidth,
                  padding: this.chartData.options.percentPadding
                },
                p: {
                  fontSize: 1.14 * scale,
                  color: '#6DADEB',
                  padding: this.chartData.options.pPadding
                }
              }
            },
            itemGap: legendItemGap
          },
          toolbox: {
            show: false
          },
          series: seriesOption
        };
        pie.setOption(option, true);

      }
    }
  }
  </script>

  <style scoped>

  </style>
