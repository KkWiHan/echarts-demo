<template>
  <div style="width: 100%;height: 100%" ref="container">
    <div id="echartsMap" class="echarts_map_container">
    </div>
    <div class="circle"></div>
    <div class="legend" :class="{up: echartsDialogShow}">
      <div class="legend-container">
        <div class="legend-container-top">
          <div class="legend-container-top-title">图例</div>
        </div>
      </div>
      <div class="legend-content">
        <div class="legend-bar"></div>
        <div class="legend-label">
          <div>{{max}}</div>
          <div>{{min}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import * as echarts from "echarts"
import "echarts-gl"
import tempData from "@/assets/data/json/data.json"
import {geoJsonMixin} from "@/mixin/geojsonMixin";
import view from "@/assets/data/json/view.json"
import {mapGetters} from "vuex";
export default {
  name: "EchartsMap",
  data() {
    return {
      isProvince: true,
      currentData: null,
      tempData: tempData,
      max: 0,
      min: 0,
    }
  },
  mixins:[geoJsonMixin],
  computed:{
    ...mapGetters([ 'district', 'chartMapData', 'regionCode','screenStatus', 'echartsDialogShow'])
  },
  watch:{
    chartMapData: {
      handler: function (val) {
        if (val) {
          this.currentData = val;
          if (this.chartMap && this.regionCode.endsWith('00')) {
            this.renderMap(this.district);
          }
        }
      },
      immediate: true
    },
    screenStatus(val){
      if (val === "EchartsMap"){
        this.renderMap(this.district);
      }
    },
  },
  methods:{
    initMap( name = "江苏省" ) {
      if(this.chartMap) {
        const htmlCollection = this.$refs.container.getElementsByTagName("canvas");
        if (htmlCollection[0]){
          let gl = htmlCollection[0].getContext('webgl');
          //使用下面的扩展插件，手动销毁WebGL context对象。
          gl.getExtension('WEBGL_lose_context').loseContext();
          this.chartMap.dispose();
          delete this.chartMap
        }
      }
      this.$store.dispatch('setDistrict', name);
      const chartDom = document.getElementById('echartsMap');
      const chartMap = echarts.init(chartDom);
      this.chartMap = chartMap;
      echarts.registerMap('direct', this.city[name]);
      const regions = this.getRegions(this.city[name]);
      this.sortRegion(regions);
      const { max, min } =  this.getMinMax(regions);
      this.max = (max && Math.ceil(max)) || 0;
      this.min = (min && Math.floor(min)) || 0;
      chartMap.setOption({
        backgroundColor: "rgba(0,0,0,0)",
        tooltip: {
          show: true,
          formatter: (params) => {
            return `<div style="display: flex;flex-direction: column;align-items: center;">
                    <div style="width: 12.71rem;height: 6.29rem;background: rgba(0,0,0,0.5)">
                      <div style="width: 12.71rem;height: 6.29rem;background: url(` + require('@/assets/images/bigScreen/bg/zuoshangjiao_blue@2x.webp') + `) center;background-size: 100% 100%;">
                        <span style="position: absolute;color: white;font-size: 1.71rem;font-family: 江城斜黑体-700w;left: 1.14rem;top: -0.5rem">${params.name}</span>
                        <span style="font-size: 1.29rem;font-family: Source Han Sans CN, Source Han Sans CN-400;font-weight: 400;text-align: center;color: #ffffff;line-height: 7.29rem;width: 100%;display: block;height: 100%">${params.data.text}</span>
                       </div>
                    </div>
                  </div>`;
          },
          extraCssText: 'box-shadow: 0 0 0px rgba(0, 0, 0, 0);',
          borderWidth: 0,
          padding: [0, 0],
          backgroundColor: "#00000000",
        },
        visualMap: {
          show: false,
          min: min || 0.4,
          max: max || 1,
          inRange: {
            color: [
              '#81afd6',
              '#6da7d8',
              '#2b79bf',
              '#014da9',
              '#013364'
            ]
          }
        },
        series: [
          {
            type: 'map3D',
            map: 'direct',
            shading: 'realistic',
            label: {
              show: true,
              formatter: function (params) {
                // 使用 HTML 标签作为标签内容
                let str = '{text|' + params.name +'}'
                if (params.data.no !== undefined){
                  str += '\n\n' + `{NO${params.data.no}|` + params.value + '}'
                }
                return str;
              },
              rich: {
                text: {
                  color: '#ffffff',
                  fontWeight: 400,
                  fontSize: 18,
                  fontFamily: "SourceHanSansCN-Normal",
                  shadowColor: "rgba(19,80,143,0.66)",
                  shadowOffsetY: 100,
                  textBorderColor: '#000',
                  textBorderWidth: 3,
                  align: 'center',
                },
                NO0: {
                  color: '#ffffff',
                  align: 'center',
                  fontSize: 18,
                  fontFamily: "SourceHanSansCN-Normal",
                  fontWeight: 500,
                  padding: [4, 5],
                  verticalAlign: 'middle',
                  textBorderColor: '#000',
                  textBorderWidth: 3,
                  backgroundColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: '#ee2626'
                      },
                      {
                        offset: 1,
                        color: '#c50000'
                      }
                    ]),
                  borderWidth: 1,
                  borderColor: '#ffaeae',
                  borderRadius: 2
                },
                NO1: {
                  color: '#ffffff',
                  align: 'center',
                  fontSize: 18,
                  fontFamily: "SourceHanSansCN-Normal",
                  fontWeight: 500,
                  padding: [4, 5],
                  verticalAlign: 'middle',
                  textBorderColor: '#000',
                  textBorderWidth: 3,
                  backgroundColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: '#ffdb00'
                    },
                    {
                      offset: 1,
                      color: '#ffb600'
                    }
                  ]),
                  borderWidth: 1,
                  borderColor: '#a8992a',
                  borderRadius: 2
                },
                NO2: {
                  color: '#ffffff',
                  align: 'center',
                  fontSize: 18,
                  fontFamily: "SourceHanSansCN-Normal",
                  fontWeight: 500,
                  padding: [4, 5],
                  verticalAlign: 'middle',
                  textBorderColor: '#000',
                  textBorderWidth: 3,
                  backgroundColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: '#ff8e00'
                    },
                    {
                      offset: 1,
                      color: '#ff3600'
                    }
                  ]),
                  borderWidth: 1,
                  borderColor: '#ffc5a5',
                  borderRadius: 2
                },
                NO3: {
                  color: '#ffffff',
                  align: 'center',
                  fontSize: 18,
                  fontFamily: "SourceHanSansCN-Normal",
                  fontWeight: 500,
                  padding: [4, 5],
                  verticalAlign: 'middle',
                  textBorderColor: '#000',
                  textBorderWidth: 3,
                  backgroundColor: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: '#00ff6c'
                    },
                    {
                      offset: 1,
                      color: '#00ff38'
                    }
                  ]),
                  borderWidth: 1,
                  borderColor: '#abe2bc',
                  borderRadius: 2
                },
              },

            },
            environment: require('@/assets/images/bigScreen/bg/bg@2x.webp'),
            itemStyle: {
              areaColor: '#666',
              opacity: 1,
              borderColor: '#FFF',
              borderWidth: 0
            },
            realisticMaterial: {
              roughness: 0,
              metalness: 1
            },
            postEffect: {
              enable: true,
              colorCorrection: {
                enable: false,
                exposure: 0,
                brightness: 0,
                contrast: 1,
                saturation: 1
              },
              screenSpaceAmbientOcclusion: {
                enable: true,
                radius: 20,
                intensity: 1,
                quality: 'ultra'
              },
              screenSpaceReflection: {
                enable: true
              },
            },
            temporalSuperSampling: {
              enable: true
            },
            groundPlane: {
              show: false,
              color: 'rgba(0, 0, 0, 0)'
            },
            light: {
              main: {
                intensity: 0,
                alpha: 30,
                beta: 20,
                shadow: true,
                shadowQuality: 'ultra'
              },
              ambient: {
                intensity: 0
              },
              
              ambientCubemap: {
                texture: require('@/assets/images/hdr/kloofendal_overcast_puresky_1k.hdr').default,
                exposure: -1,
                diffuseIntensity: 1,
                specularIntensity: 1
              }
            },
            viewControl: Object.assign( view[ name ], {
              rotateSensitivity: 0,  // 禁用用户旋转地图
              alpha: 45
            } ),
            data: regions
          }
        ]
      })
      chartMap.on( 'click', params => {
        if ( this.isProvince ) {
          this.renderMap( params.name );
        } else {
          let geoJson = this.getRegionGeoJson( params.name );
          this.$bus.$emit( 'switchCesiumOrEcharts', "CesiumMap" )
          if ( geoJson ) {
            this.$bus.$emit( 'flyToGeoJson', geoJson );
          }
        }
        this.$store.dispatch('setDistrict', params.name);
        this.$store.dispatch( 'setRegionCode', params.data.code )
      });
    },
    renderMap( name = "江苏省" ){
      if ( name !== "江苏省" && name ) {
        this.isProvince = false;
        this.initMap(name);
      } else if( name === '江苏省' ){
        this.isProvince = true;
        this.initMap();
      }else {
        this.isProvince = true;
        this.initMap();
      }
    },
    getRegions(jsonData){
      return jsonData.features.map( feature => {
        let data;
        if ( this.currentData ){
          data = this.currentData[ feature.properties.name ]
          if ( data && data.label && data.unit ) {
            data = '' + data.label + ':' + data.number + data.unit;
          }
        }
        return {
          name: feature.properties.f_name || feature.properties.name,
          value: this.getNumber( data ) || 0,
          height: Math.random() * 2 + 2,
          text: data || '',
          code: feature.properties.f_code || '' + feature.properties.adcode
        };
      });
    },
    sortRegion(regions){
      regions.sort((a,b) => {
        return b.value - a.value
      })
      regions.forEach((region, index) => {
        if (region.value !== 0 && index < 4){
          region.no = index
        }
      })
    },
    getMinMax(regions) {
      let max = Number.MIN_VALUE;
      let min = Number.MAX_VALUE;
      regions.forEach( region => {
        if ( region.value ){
          ( region.value > max ) && ( max = region.value );
          ( region.value < min ) && ( min = region.value );
        }
      })
      return {
        min: min === Number.MAX_VALUE ? null : min,
        max: max === Number.MIN_VALUE ? null : max
      }
    },
    getNumber(str){
      if (str) {
        const match = str.match(/(\d+(\.\d+)?)/);
        if (match) {
          return parseFloat(match[0]);
        } else {
          return '';
        }
      } else {
        return '';
      }
    },
    getRegionGeoJson(name) {
      return this.city[ this.district ].features.find( feature => feature.properties.name === name );
    }
  },
  mounted() {
    this.initMap();
    this.$bus.$on( 'districtChange', this.renderMap )
  }
}
</script>

<style scoped>
.echarts_map_container{
  width: 100%;
  height: 100%;
  background: transparent;
}
.label_mask{
  width: 100%;
  height: 100%;
  position: absolute;
}
.circle{
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/bigScreen/bg/pic_yuan@2x.webp') 50% 80% no-repeat;
  background-size: 45% 80%;
  pointer-events: none;
  position: absolute;
  z-index: 0;
  top: 0
}
.legend{
  background: rgba(0,0,0,0.80) linear-gradient(21deg, rgba(22,157,255,0.3) 0%, rgba(50,144,255,0.00) 100%);
  border: 0.07rem solid;
  border-image: linear-gradient(180deg, rgba(255,255,255,0.20), #ffffff 100%) 1 1;
  border-radius: 0.29rem;

  position: fixed;
  bottom: 0.64rem;
  left: 36.14rem;
}
.up{
  bottom: 25.64rem;
  left: 36.14rem;
}
.legend-container{
  padding: 0 0.64rem ;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.legend-container-top{
  width: 100%;
  height: 2.86rem;
  background: url("~@/assets/images/bg.png") no-repeat left;
}
.legend-container-top-title{
  font-size: 1.37rem;
  font-family: 江城斜黑体, 江城斜黑体-700,serif;
  font-weight: normal;
  text-align: LEFT;
  color: #ffffff;
  line-height: 2.36rem;
  text-shadow: 0.14rem 0.14rem 0.57rem  rgba(5,28,55,0.42), 0 0 0.5rem  rgba(75,180,229,0.29);
  margin-left: 1.46rem;
}
.legend-content{
  display: flex;
  padding: 0.57rem;
  gap: 0.43rem;
}
.legend-bar{
  width: 0.71rem;
  height: 10.71rem;
  background: linear-gradient(180deg,#023c7b, #81afd6 100%);
}
.legend-label{
  display: flex;
  flex-direction: column;
  font-size: 1.29rem;
  font-family: Source Han Sans CN, Source Han Sans CN-500,serif;
  font-weight: 500;
  text-align: LEFT;
  color: rgba(255,255,255,0.80);
  line-height: 1.29rem;
  justify-content: space-between;
}
</style>
<style>
.echarts_map_container{
  width: 100%;
  height: 100%;
  background: transparent;
}
</style>
