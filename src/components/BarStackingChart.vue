<template>
    <div style="width: 100%;height: 500px; background: gray;" ref="barChart"></div>
</template>
  
<script>
import * as echarts from "echarts"

export default {
    name: "BarStackingChart",
    data() {
        return {
        }
    },
    props: {
        chartData: {
            type: Object,
            default: () => ({
                unity: '万栋',
                xAxisNumShow: true,
                topLabelShow: true,
                legend: ['城镇', '农村'],
                colors: [
          new echarts.graphic.LinearGradient(
            0, 0, 0, 1, [{
              offset: 0,
              color: '#41bbed'
            },
              {
                offset: 0.5,
                color: '#41bfee'
              },
              {
                offset: 1,
                color: '#1f98d2'
              }
            ]
          ),
          new echarts.graphic.LinearGradient(
            0, 0, 0, 1, [{
              offset: 0,
              color: '#2ed0b0'
            },
              {
                offset: 0.5,
                color: '#34b28f'
              },
              {
                offset: 1,
                color: '#2b846b'
              }
            ]
          )
        ],
                grid: {
                    bottom: '15%',
                    top: '25%'
                },
                data: [
                    {
                        name: '南京',
                        value: [600, 90]
                    },
                    {
                        name: '无锡',
                        value: [90, 80]
                    },
                    {
                        name: '苏州',
                        value: [120, 90]
                    },
                    {
                        name: '常州',
                        value: [160, 40]
                    },
                    {
                        name: '南通',
                        value: [180, 30]
                    }
                ]
            })
        },
    },
    methods: {
        initCharts() {
            let bar = echarts.init(this.$refs.barChart);
            let grid = this.chartData.grid;
            let xAxisData = [];
            let data1 = [];
            let data2 = [];
            let seriesData = [];
            this.chartData.data.forEach((item) => {
                let val1 = item.value[0];
                let val2 = item.value[1];
                xAxisData.push(item.name);
                data1.push(val1);
                data2.push(val2);
            })
            let dataAll = [data1, data2]
            // 用于展示柱子上数字（数据的总和）
            let sums = [];
            for (let i = 0; i < dataAll[0].length; i++) {
                let sum = 0;
                for (let j = 0; j < dataAll.length; j++) {
                    sum += parseFloat(dataAll[j][i]);
                }
                sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
            }
            
            this.chartData.legend.forEach((item, index) => {
                seriesData.push({
                    name: this.chartData.legend[index],
                    type: 'bar',
                    showBackground: true,
                    // barGap: '-200%',
                    stack: '整治',
                    data: dataAll[index],
                    barWidth: 10,
                    zlevel: 5,
                    label: {
                                show: item === '农村' ? true : false,
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 14
                                },
                                position: "top",
                                formatter: function (params) {
                                    return sums[params.dataIndex];
                                }
                            },
                    itemStyle: {
                        color: this.chartData.colors[index],
                    },
                })
            })
            /*      seriesData.push( {
                    name: '背景',
                    type: 'bar',
                    data: bgData,
                    barWidth: '50%',
                    itemStyle: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    silent: true, // 确保背景条不会响应交互事件
                    zlevel: 0 // 使其在条形图之下
                  })*/
            let option = {
                tooltip: {
                    trigger: 'axis', // 触发类型，可以根据需要选择
                    backgroundColor: 'rgba(0,0,0,0.7)', // tooltip背景颜色
                    axisPointer: {
                        type: 'shadow'
                    },
                    textStyle: {
                        color: '#ffffff', // tooltip文字颜色
                        fontSize: 14,
                    },
                },
                grid: grid,
                legend: {
                    data: this.chartData.legend,
                    textStyle: {
                        color: 'rgba(255,255,255,0.80)',
                        fontSize: 12,
                        fontFamily: 'Source Han Sans CN, Source Han Sans CN-400'
                    },
                    right: '25%',
                    top: '8%'
                },
                xAxis: {

                    
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {
                        interval: 0,
                        color: '#94AABD',
                        fontSize: 15,
                        padding: [0, 0, 0, -7]
                    },
                    axisLine: {
                        show: false, //不显示坐标轴线
                    },
                    axisTick: {
                        show: false //不显示坐标轴刻度线
                    },
                },
                yAxis: {
                    type: 'value',
                    name: this.chartData.unity,
                    nameLocation: 'end', // 将单位移到Y轴的起始位置
                    nameTextStyle: {
                        color: '#94AABD',
                        fontSize: 15,
                    },
                    nameGap: 10, // 调整单位与Y轴的距离，可以根据需要进行更改
                    axisLabel: {
                        color: '#94AABD',
                        fontSize: 15,
                    },
                    // 虚线刻度线
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    },
                },
                series: seriesData
            }

            bar.setOption(option, true);
            bar.off('legendselectchanged').on('legendselectchanged', function (params) {
                let selected = params.selected;
                let trueCount = 0;
                for (let key in selected) {
                    if (selected[key]) {
                        trueCount++;
                    }
                }
                console.log(trueCount);
                let allSelected = Object.keys(selected).every(key => selected[key]);
                // 如果所有图例都被选中，则显示所有相加的总数
                if (allSelected) {
                    sums = []
                    seriesData.forEach(series => {
                        for (let i = 0; i < dataAll[0].length; i++) {
                            let sum = 0;
                            for (let j = 0; j < dataAll.length; j++) {
                                sum += parseFloat(dataAll[j][i]);
                            }
                            sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                        }
                        if (series.name === '农村') {
                            series.label.show = true
                            series.itemStyle.emphasis = { label: { show: true } };
                            series.label.formatter = function (params) {
                                return sums[params.dataIndex];
                            };
                        } else {
                            series.label.show = false
                            series.itemStyle.emphasis = { label: { show: false } };
                        }
                    });
                }
                //不是图例全选的情况
                else {
                    seriesData.forEach(series => {
                        series.label.show = true
                        series.itemStyle.emphasis = { label: { show: true } };//必要否则鼠标悬浮上去会隐藏标签，未知原因
                        series.label.formatter = function (params) {
                            return params.value;
                        };
                    });
                }

                // 极度定制化的例子
                        // 如果所有图例都被选中，则显示所有相加的总数
/*         if (allSelected) {
          sums = []
          seriesData.forEach(series => {
            for (let i = 0; i < dataAll[0].length; i++) {
              let sum = 0;
              for (let j = 0; j < dataAll.length; j++) {
                sum += parseFloat(dataAll[j][i]);
              }
              sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
            }
            if (series.name === '超高层' || series.name === '三层以上') {
              series.itemStyle.normal.label.show = true
              series.itemStyle.emphasis = { label: { show: true } };
              series.itemStyle.normal.label.formatter = function(params) {
                return sums[params.dataIndex];
              };
            } else {
              series.itemStyle.normal.label.show = false
              series.itemStyle.emphasis = { label: { show: false } };
            }
          });
        } */
        //不是图例全选的情况
/*         else {
          if (_this.currentSelected === '城镇房屋'){
            // 单选展示默认的
            if (trueCount === 1){
              seriesData.forEach(series => {
                series.itemStyle.normal.label.show = true
                series.itemStyle.emphasis = { label: { show: true } };
                series.itemStyle.normal.label.formatter = function(params) {
                  return params.value;
                };
              });
            }
            // 双选展示两根相加
            if (trueCount === 2) {
              if (selected.低层或多层 && selected.高层){
                let data1 = [dataAll[0], dataAll[1]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '高层') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.低层或多层 && selected.超高层){
                let data1 = [dataAll[0], dataAll[2]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '超高层') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.高层 && selected.超高层){
                let data1 = [dataAll[1], dataAll[2]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '超高层') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
            }
          }
          if (_this.currentSelected === '农村房屋'){
            // 单选展示默认的
            if (trueCount === 1){
              seriesData.forEach(series => {
                series.itemStyle.normal.label.show = true
                series.itemStyle.emphasis = { label: { show: true } };
                series.itemStyle.normal.label.formatter = function(params) {
                  return params.value;
                };
              });
            }
            // 双选
            if (trueCount === 2) {
              if (selected.一层 && selected.两层){
                let data1 = [dataAll[0], dataAll[1]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '两层') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.一层 && selected.三层){
                let data1 = [dataAll[0], dataAll[2]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '三层') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.一层 && selected.三层以上){
                let data1 = [dataAll[0], dataAll[3]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '三层以上') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.两层 && selected.三层){
                let data1 = [dataAll[1], dataAll[2]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '三层') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.两层 && selected.三层以上){
                let data1 = [dataAll[1], dataAll[3]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '三层以上') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.三层 && selected.三层以上){
                let data1 = [dataAll[2], dataAll[3]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '三层以上') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
            }
            if (trueCount === 3) {
              if (selected.一层 && selected.两层 && selected.三层){
                let data1 = [dataAll[0], dataAll[1], dataAll[2]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '三层') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.一层 && selected.两层 && selected.三层以上){
                let data1 = [dataAll[0], dataAll[1], dataAll[3]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '三层以上') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.一层 && selected.三层 && selected.三层以上){
                let data1 = [dataAll[0], dataAll[2], dataAll[3]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '三层以上') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
              if (selected.两层 && selected.三层 && selected.三层以上){
                let data1 = [dataAll[1], dataAll[2], dataAll[3]]
                sums = []
                seriesData.forEach(series => {
                  for (let i = 0; i < data1[0].length; i++) {
                    let sum = 0;
                    for (let j = 0; j < data1.length; j++) {
                      sum += parseFloat(data1[j][i]);
                    }
                    sums.push(sum.toFixed(2));  // 将和转换为字符串，保留两位小数
                  }
                  if (series.name === '三层以上') {
                    series.itemStyle.normal.label.show = true
                    series.itemStyle.emphasis = { label: { show: true } };
                    series.itemStyle.normal.label.formatter = function(params) {
                      return sums[params.dataIndex];
                    };
                  } else {
                    series.itemStyle.normal.label.show = false
                    series.itemStyle.emphasis = { label: { show: false } };
                  }
                });
              }
            }
          }
        } */

                // 更新图表选项
                bar.setOption({ series: seriesData });
            })

            /*      // 计算y轴最大值
                  const maxValue = bar.getModel().getComponent('yAxis').axis.scale.getExtent()[1];
                  //用最大值渲染背景槽长度
                  this.bacValue = new Array(13).fill(maxValue);
                  // 使用新的bacValue更新图表选项
                  option.series[2].data = this.bacValue;
            
                  // 用新的选项再次设置图表
                  bar.setOption(option, true);*/

        },
    },
    mounted() {
        this.initCharts();
    }
}
</script>
  
<style scoped></style>
  