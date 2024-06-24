<template>
  <div style="width: 100%;height: 100%;">
    <!-- <sm-viewer></sm-viewer> -->

    <!-- echarts的江苏省地图 不用store也可以加载-->
    <!-- <EchartsMap ref="EchartsMap"></EchartsMap> -->

    <!-- 3d环图 内有一系列配置 -->
    <!-- <ThreeDRingChart></ThreeDRingChart> -->

    <!-- 西瓜播放器 若是3.x版本需要导入样式 -->
    <!-- <Xgplayer></Xgplayer> -->

    <!-- 代码编译器和一些基本配置、参考文章 -->
    <!-- <codeEditor></codeEditor> -->

    <!-- echarts堆叠图，渐变色设置，定制柱子上方展示总数量，定制点击图例事件-->
    <!-- <BarStackingChart></BarStackingChart> -->

    <!-- 是两根柱子通过设置barGap的重叠实现的堆叠，通常用于展示一组数据相对于另一组数据的占比 -->
    <!-- <BarStackingChart2></BarStackingChart2> -->

    <!-- 环图，内有rich定制图例，环内背景图片和文字，指引线，按最大分类统计 -->
    <PieChart></PieChart>

    <!-- 基本柱状图，带渐变色，悬浮渐变，小柱子带大背景（靠barGap调整） -->
    <!-- <BarChart></BarChart> -->

    <!--  测试插件和传值  -->
    <!-- <my-son></my-son>-->

    <!--  在main.js中全局注册的组件测试  -->
     <!-- <splash-test></splash-test> -->

      <!--  图层树(样式)  -->
       <!-- <LayerManagement></LayerManagement> -->

  </div>
</template>

<script>
// import EchartsMap from '@/components/EchartsMap.vue'
// import ThreeDRingChart from '@/components/ThreeDRingChart.vue'
// import Xgplayer from '@/components/XgplayerFlvPlayer.vue'
// import codeEditor from '@/components/CodeEdit.vue'
// import BarStackingChart from '@/components/BarStackingChart.vue'
// import BarStackingChart2 from '@/components/BarStackingChart2.vue'
import PieChart from '@/components/PieChart.vue'
// import BarChart from '@/components/BarChart.vue'
import MySon from '@/components/MySon.vue'
import LayerManagement from './components/LayerManagement.vue';

export default {
  name: "CesiumComponent",
  components:{MySon, LayerManagement, PieChart},
  mounted() {
  }
};
</script>

<style scoped>

</style>
