import jiangsu from "@/assets/data/json/jiangsu.json"
import nanjing from "@/assets/data/json/nanjing.json"
import zhenjiang from "@/assets/data/json/zhenjiang.json"
import changzhou from "@/assets/data/json/changzhou.json"
import wuxi from "@/assets/data/json/wuxi.json"
import suzhou from "@/assets/data/json/suzhou.json"
import nantong from "@/assets/data/json/nantong.json"
import taizhou from "@/assets/data/json/taizhou.json"
import yangzhou from "@/assets/data/json/yangzhou.json"
import huaian from "@/assets/data/json/huaian.json"
import yancheng from "@/assets/data/json/yancheng.json"
import lianyungang from "@/assets/data/json/lianyungang.json"
import suqian from "@/assets/data/json/suqian.json"
import xuzhou from "@/assets/data/json/xuzhou.json"
import sheng from "@/assets/data/json/province.json"
import {districtInit} from '@/utils/bigScreen/DistrictInit';


export const geoJsonMixin = {
    data() {
        return {
            city: {
                "江苏省": jiangsu,
                "江苏省边界": sheng,
                "南京市": nanjing,
                "镇江市": zhenjiang,
                "常州市": changzhou,
                "无锡市": wuxi,
                "苏州市": suzhou,
                "南通市": nantong,
                "泰州市": taizhou,
                "扬州市": yangzhou,
                "淮安市": huaian,
                "盐城市": yancheng,
                "连云港市": lianyungang,
                "宿迁市": suqian,
                "徐州市": xuzhou
            },
        }
    },
    methods:{
        getRegionGeoJsonByName ( name ) {
            return this.city[ name ];
        },
      // 获取所有市或者市里所有区的顺序数组(name传vuex里的district)
      getDistrictNameBySort(name){
          let districtData = this.city[name].features;
          districtData.sort((a, b) =>{
            return Number(a.properties.f_code) - Number(b.properties.f_code)
          });
          let districtName = [];
          districtData.forEach(e =>{
            districtName.push(districtInit(e.properties.name));
          });
          return districtName;
      }
    }
}
