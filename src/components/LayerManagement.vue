<template>
  <div class="public-layer">
    <el-tree
        :data="priData.data"
        :show-checkbox="false"
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        class="tree-box"
        @check-change="handleTreeCheck"
        :props="defaultProps">
    <span slot-scope="{ node, data }" class="custom-tree-node" :class="{'custom-tree-node-notfolder': !isFolder(data)}">
      <span>
        <img v-show="isFolder(data)" :src="folderIcon" alt=""/>
        <!--    不折叠的或者特殊设置的展示checkBox    -->
        <el-checkbox v-show="!isFolder(data) || data.checkEnabled" v-model="node.checked"
                             :indeterminate="node.indeterminate"
                             @change="handleCheck(data, node.checked, node)"></el-checkbox>
        <span>{{ data.name }}</span>
      </span>
    </span>
    </el-tree>
  </div>
</template>

<script>

/**
 * 云笔记中可以看到node的相关
 */
export default {
  name: 'LayerManagement',
  data() {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                }, {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      // 规定数据中展示的字段是哪个
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      priData: {
        "msg": "查询成功",
        "code": 200,
        "data": [
          {
            "children": [
              {
                "name": "宜昌奥体体育馆",
                "show": true,
                "id": "s3m_baimo",
                "type": "s3m",
                "config": {
                  "url": "http://192.168.2.182:8884/gtis/3d/s3m/e1722329262c4eadb71a879555bf3b5f/rest/realspace/datas/YCAT_xz/config"
                }
              },
              {
                "name": "宜昌党校",
                "show": true,
                "remark": "",
                "id": "6241f1f6-6e03-48b4-91b8-e44d502d43f4",
                "type": "s3m",
                "config": {
                  "isGeoTilesRootNodeSave": false,
                  "brightness": 1,
                  "isAttributesSave": false,
                  "loadMode": "Child_Priority_NonLinear",
                  "lodRangeScale": 1,
                  "isGeoTilesSave": false,
                  "bottomAltitudeOffset": 0,
                  "orderIndependentTranslucency": false,
                  "residentRootTile": false,
                  "url": "http://192.168.2.182:8884/gtis/3d/s3m/225c794bd34b403d8f2d4c7fa9a2fce0/rest/realspace/datas/YCDX_ZZ/config"
                }
              },
              {
                "name": "宜昌文体创意中心",
                "show": true,
                "remark": "",
                "id": "edae81be-9586-4a29-8da3-e9f348938cc5",
                "type": "s3m",
                "config": {
                  "isGeoTilesRootNodeSave": false,
                  "haveFloors": true,
                  "brightness": 10,
                  "isAttributesSave": false,
                  "floors": [
                    4,
                    8
                  ],
                  "loadMode": "Child_Priority_NonLinear",
                  "lodRangeScale": 1,
                  "isGeoTilesSave": false,
                  "bottomAltitudeOffset": 0,
                  "orderIndependentTranslucency": true,
                  "residentRootTile": false,
                  "url": "http://192.168.2.182:8884/gtis/3d/scene/c3697b2c1cc845278e18178e8cf36b9a/rest/realspace"
                }
              },
              {
                "resourceId": "ff8080817e005fce017e09fcac390058",
                "name": "宜昌卫生中心",
                "show": true,
                "remark": "",
                "id": "a099be9d-d457-40bd-a2e3-50f55ff7137d",
                "source": "RESOURCE_ID",
                "type": "s3m",
                "config": {
                  "brightness": 0,
                  "lodRangeScale": 0.01
                }
              },
              {
                "resourceId": "",
                "name": "s3m3.0",
                "show": true,
                "remark": "",
                "id": "c1684c49-d7ef-4cbc-960d-2f15a64d5149",
                "source": "DEFAULT",
                "type": "s3m",
                "config": {
                  "isGeoTilesRootNodeSave": false,
                  "isGeoTilesSave": false,
                  "bottomAltitudeOffset": 0,
                  "orderIndependentTranslucency": true,
                  "url": "http://192.168.2.100:8090/iserver/services/3D-YCYL/rest/realspace",
                  "haveFloors": false,
                  "brightness": 1,
                  "isAttributesSave": false,
                  "floors": [],
                  "loadMode": "Child_Priority_NonLinear",
                  "clearMemoryImmediately": true,
                  "lodRangeScale": 1,
                  "residentRootTile": false
                }
              },
              {
                "resourceId": "",
                "isOverlay": false,
                "show": true,
                "remark": "一标三实",
                "source": "DEFAULT",
                "type": "s3m",
                "defaultLoad": false,
                "name": "倾斜摄影",
                "id": "6ee67dbd-ce0f-43cb-8f3f-a1045b4e9918",
                "config": {
                  "pbr": "pipeline",
                  "isCameraController": false,
                  "bottomAltitudeOffset": 0,
                  "orderIndependentTranslucency": true,
                  "lineWidth": 1,
                  "dthServerId": "ff80808188ae5f100188c83e95580028",
                  "dthColor": "rgba(255,0,0,0.3)",
                  "saturation": 1,
                  "directLightEnabled": false,
                  "haveFloors": false,
                  "floors": [],
                  "dthClickBuffer": 0,
                  "alpha": 1,
                  "loadMode": "Child_Priority_NonLinear",
                  "directLightIntensity": 0.1,
                  "residentRootTile": false,
                  "isGeoTilesRootNodeSave": false,
                  "fillForeColor": "#ffffff",
                  "cutLayerName": "HEAT",
                  "wireFrameMode": 1,
                  "lineColor": "#ffffff",
                  "isGeoTilesSave": false,
                  "loadPBR": false,
                  "url": "http://192.168.2.182:8884/gtis/3d/scene/726f6b1d7af94acfa7533f19dc954fc2/rest/realspace",
                  "brightness": 5.9,
                  "isAttributesSave": false,
                  "dthBuffer": 0,
                  "contrast": 1,
                  "clearMemoryImmediately": true,
                  "fillStyle": 0,
                  "lodRangeScale": 1,
                  "partlyTransparent": false,
                  "dthEnabled": true
                },
                "propertyId": "",
                "key": "",
                "resourceType": "3B30CBF1529549B7B7932E35FA6AA197"
              },
              {
                "resourceId": "http://192.168.2.182:8884/gtis/3d/scene/726f6b1d7af94acfa7533f19dc954fc2/rest/realspace",
                "locateParams": "",
                "legend": "",
                "show": true,
                "remark": "重要场所",
                "source": "DEFAULT",
                "type": "s3m",
                "subdomains": "",
                "defaultLoad": false,
                "name": "倾斜摄影2",
                "id": "cf9163fa-86e9-4690-923f-3917900117fb",
                "fields": [],
                "config": {
                  "pbr": "pipeline",
                  "isCameraController": false,
                  "bottomAltitudeOffset": 0,
                  "orderIndependentTranslucency": true,
                  "lineWidth": 1,
                  "dthServerId": "",
                  "dthColor": "rgba(255,0,0,0.3)",
                  "saturation": 1,
                  "directLightEnabled": false,
                  "haveFloors": false,
                  "floors": [],
                  "dthClickBuffer": 0,
                  "alpha": 1,
                  "loadMode": "Child_Priority_NonLinear",
                  "directLightIntensity": 0.1,
                  "residentRootTile": false,
                  "isGeoTilesRootNodeSave": false,
                  "fillForeColor": "#ffffff",
                  "wireFrameMode": 1,
                  "lineColor": "#ffffff",
                  "isGeoTilesSave": false,
                  "loadPBR": false,
                  "url": "http://192.168.2.182:8884/gtis/3d/scene/726f6b1d7af94acfa7533f19dc954fc2/rest/realspace",
                  "brightness": 1,
                  "isAttributesSave": false,
                  "dthBuffer": 0,
                  "contrast": 1,
                  "clearMemoryImmediately": true,
                  "fillStyle": 0,
                  "lodRangeScale": 1,
                  "partlyTransparent": false,
                  "dthEnabled": false
                },
                "propertyId": "",
                "key": ""
              }
            ],
            "name": "三维模型",
            "show": true,
            "id": "model",
            "checkEnabled": true
          },
          {
            "children": [
              {
                "name": "生态红线",
                "show": true,
                "id": "map_shengtaihongxian",
                "type": "map",
                "config": {
                  "type": "supermap",
                  "url": "http://192.168.2.182:8884/gtis/map/rest/172802c53d7b40aa92f94b00654a73b2/rest/maps/STBHHX2018"
                }
              },
              {
                "name": "影像地图",
                "show": true,
                "id": "map_yingxiang",
                "source": "DEFAULT",
                "type": "map",
                "config": {
                  "maximumLevel": 6,
                  "type": "supermap",
                  "url": "http://192.168.2.182:8884/gtis/map/rest/db8462d60895465690495c5cad42d9b9/rest/maps/zydc_gtdc_tdlyxz",
                  "minimumLevel": 0
                }
              },
              {
                "name": "道路水系地图",
                "show": true,
                "remark": "",
                "id": "d12615ce-5b00-40dd-bb70-52cd8d189f20",
                "type": "map",
                "config": {
                  "url": "http://192.168.2.100:8090/iserver/services/map-shense/rest/maps/%E9%81%93%E8%B7%AF%E7%BB%BF%E5%9C%B0%E6%B0%B4%E7%B3%BB"
                }
              },
              {
                "name": "wmts-天地图矢量",
                "show": true,
                "remark": "",
                "id": "2570ecfc-e777-4f12-9fef-1796302c0467",
                "source": "DEFAULT",
                "type": "map",
                "config": {
                  "maximumLevel": 6,
                  "tileMatrixSetID": "c",
                  "center": "118,23",
                  "format": "tiles",
                  "style": "default",
                  "type": "wmts",
                  "url": "http://192.168.2.182:8884/gtis/map/wmts/d320516589d54a7fb058e7c54f89f751?tk=436ce7e50d27eede2f2929307e6b33c0",
                  "minimumLevel": 0,
                  "layer": "vec"
                }
              },
              {
                "name": "宿迁",
                "show": true,
                "remark": "123123",
                "id": "97bd35e1-43cd-423a-9b45-fcfce9dba06f",
                "type": "map",
                "config": {
                  "type": "supermap",
                  "url": "http://192.168.80.54:8090/iserver/services/map-agscache-TuCeng2/rest/maps/%E5%9B%BE%E5%B1%82"
                }
              },
              {
                "resourceId": "ff8080817d37b48e017d42ad8c400047",
                "name": "基本农田保护区",
                "show": true,
                "remark": "",
                "id": "a8e8ae3b-1c17-4bdb-93ee-ed07e18a2ede",
                "source": "RESOURCE_ID",
                "type": "map",
                "config": {}
              },
              {
                "resourceId": "ff8080817f2570f70180ace1c78b0139",
                "name": "CIM-天地图",
                "show": true,
                "remark": "",
                "id": "751bef31-f721-49d9-904e-65d005df55a6",
                "source": "RESOURCE_ID",
                "type": "map",
                "config": {
                  "maximumLevel": 12,
                  "type": "wmts",
                  "url": "",
                  "minimumLevel": 0
                }
              },
              {
                "resourceId": "ff80808188ae5f100188d6805327003b",
                "locateParams": "{\n    \"position\": {\n      \"lon\": 111.29104113402937,\n      \"lat\": 30.697886586058665,\n      \"height\": 549.8366358732692\n    },\n    \"hpr\": {\n      \"heading\": 359.62884864552046,\n      \"pitch\": -10.188960064276733,\n      \"roll\": 359.9999999999994\n    }\n  }",
                "legend": "",
                "show": true,
                "remark": "",
                "source": "RESOURCE_ID",
                "type": "map",
                "resourceModelId": "1B30CBF1529149B7B7932E35FA6AA003",
                "subdomains": "",
                "defaultLoad": false,
                "name": "宜昌人口分布图",
                "resourceTheme": [
                  {
                    "themeId": "0",
                    "themeName": "全部",
                    "themeStatus": "1",
                    "themeUserName": "admin",
                    "themeCreateDate": "2022-07-28T09:31:43.893+00:00",
                    "resourceDtoList": null
                  }
                ],
                "id": "91be46a7-5197-42dd-b96f-6dbd3995b7e6",
                "fields": [],
                "config": {},
                "propertyId": "",
                "key": "",
                "resourceCreateYear": "2023",
                "resourceType": "3B30CBF1529549B7B7932E35FA6AA197"
              }
            ],
            "name": "二维地图",
            "show": true,
            "id": "map2d"
          },
          {
            "children": [
              {
                "resourceId": "ff8080817cedb7c0017d0eb3b86b005b",
                "name": "宜昌数字高程模型",
                "show": true,
                "remark": "",
                "id": "33eb0906-a849-4b56-9174-1ab8703d0f98",
                "source": "DEFAULT",
                "type": "terrain",
                "config": {
                  "isSct": true,
                  "url": "http://192.168.2.100:8090/iserver/services/3D-DEM_FX/rest/realspace"
                }
              }
            ],
            "name": "地形",
            "show": true,
            "id": "terrain"
          },
          {
            "children": [
              {
                "name": "宜昌停车场",
                "show": true,
                "id": "data_zydc_csbj_tcc",
                "type": "data",
                "config": {
                  "type": "database",
                  "tableName": "zydc_csbj_tcc"
                }
              },
              {
                "name": "锦州辖区",
                "show": true,
                "id": "data_xiaqu",
                "type": "data",
                "config": {
                  "datasetName": "GGJC_XZQH_B",
                  "type": "rest",
                  "datasourceName": "jinzhou_1",
                  "fill": "rgba(255,0,0,0.3)",
                  "stroke": "rgba(255,0,0,1)",
                  "url": "http://192.168.80.54:8090/iserver/services/data-jinzhou/rest/data"
                }
              },
              {
                "name": "学校点位",
                "show": true,
                "id": "data_xuexiao",
                "type": "data",
                "config": {
                  "datasetName": "JCZD_SH_B",
                  "icon": {
                    "width": 32,
                    "scale": 1,
                    "url": "",
                    "height": 32
                  },
                  "type": "rest",
                  "datasourceName": "jinzhou_1",
                  "url": "http://192.168.80.54:8090/iserver/services/data-jinzhou/rest/data",
                  "maxFeatures": 1000
                }
              },
              {
                "name": "锦州POI",
                "show": true,
                "id": "data_poi",
                "type": "data",
                "config": {
                  "cluster": 1,
                  "datasetName": "SLGC_PSZ_B",
                  "icon": {
                    "width": 26,
                    "scale": 1,
                    "url": "ic_wanggeyuan.png",
                    "height": 26
                  },
                  "type": "rest",
                  "datasourceName": "jinzhou_1",
                  "url": "http://192.168.80.54:8090/iserver/services/data-jinzhou/rest/data",
                  "maxFeatures": 10
                }
              },
              {
                "name": "宜昌停车场后端聚合",
                "show": true,
                "id": "data_zydc_csbj_tcc_hd",
                "source": "DEFAULT",
                "type": "data",
                "config": {
                  "cluster": 2,
                  "datasetName": "",
                  "icon": {
                    "width": 32,
                    "scale": 1,
                    "url": "ic_wanggeyuan.png",
                    "height": 32
                  },
                  "type": "database",
                  "datasourceName": "",
                  "fill": "rgba(0,0,255,0.2)",
                  "stroke": "rgba(0,0,255,1)",
                  "url": "",
                  "maxFeatures": 50,
                  "tableName": "zydc_csbj_tcc"
                }
              }
            ],
            "name": "数据资源",
            "show": true,
            "id": "data"
          },
          {
            "resourceId": "ff808081864873c9018648750cad0002",
            "locateParams": "",
            "legend": "",
            "show": true,
            "remark": "",
            "source": "RESOURCE_ID",
            "type": "data",
            "resourceModelId": "1B30CBF1529149B7B7932E35FA6AA006",
            "subdomains": "",
            "defaultLoad": false,
            "name": "点测试",
            "resourceTheme": [
              {
                "themeId": "4028d0ca827b45e001827c32a4fa0000",
                "themeName": "基础地理",
                "themeStatus": "1",
                "themeUserName": "admin",
                "themeCreateDate": "2022-08-08T06:44:30.026+00:00",
                "resourceDtoList": null
              }
            ],
            "id": "5d2b2933-b793-4e98-8ea5-96cc9af195c4",
            "fields": [],
            "config": {
              "cluster": 0,
              "datasetName": "",
              "icon": {
                "width": 32,
                "scale": 1,
                "url": "",
                "height": 32
              },
              "type": "database",
              "fill": "rgba(0,0,255,0.2)",
              "stroke": "rgba(0,0,255,1)",
              "url": "",
              "maxFeatures": 20000,
              "tableName": "",
              "filter": "",
              "initDataFields": "",
              "geometryStyle": {
                "pointModel": "scatter",
                "emissionRate": 200,
                "symbol": "",
                "polygonFillColor": "rgba(0,0,255,0.2)",
                "heightField": "",
                "startScale": 3,
                "gridFontSize": 14,
                "endScale": 1.5,
                "lifetime": 10,
                "hasBubble": true,
                "particlePixelSize": 10,
                "strokeColorReverse": "rgba(0,0,255,1)",
                "minHeight": 0,
                "gridSize": 40,
                "lineType": "solid",
                "scanModel": "ring",
                "particleType": "fire",
                "RadiType": "cone",
                "clampToS3M": false,
                "burstSize": 600,
                "minimumSpeed": 7,
                "scatterType": "icon",
                "heatMin": 0,
                "textureModel": "unification",
                "heatGradient": 0,
                "maximumExplosionSize": 50,
                "maximumSpeed": 9,
                "minimumExplosionSize": 20,
                "heatWeight": "",
                "colorOption": 0,
                "heatMax": 3,
                "strokeWidth": 2,
                "scanColor": "#fff400",
                "gridFontColor": "#ffffff",
                "scanSpeed": 1000,
                "polygonModel": "single",
                "gridGradient": 0,
                "heatRadius": 15,
                "textureEffect": "vertical",
                "flowSpeed": 2,
                "textureSpeed": 3,
                "strokeColorForward": "rgba(0,0,255,1)",
                "scanTexture": "ring2",
                "repeat": 1,
                "gridWeight": "",
                "particleSize": 2,
                "minimumParticleLife": 1.5,
                "textureColor": "#fff400",
                "scanPeriod": 2,
                "symbolSize": 0,
                "polygonStrokeWidth": 2,
                "texture": "",
                "symbolColor": "#ff0000",
                "lineModel": "single",
                "gridShowLabel": true,
                "polygonStrokeColor": "rgba(0,0,255,1)",
                "label": "",
                "clampToGround": true,
                "gravity": 0,
                "bufferDistance": 1,
                "maximumParticleLife": 1.8
              },
              "fillByFieldColorConfig": {
                "mode": "single"
              },
              "datasourceName": "",
              "fillByField": false,
              "geometryType": "Point"
            },
            "propertyId": "",
            "key": "",
            "resourceCreateYear": "2023",
            "resourceType": "3B30CBF1529549B7B7932E35FA6AA198"
          },
          {
            "children": [
              {
                "resourceId": "ff80808188ae5f1001892de47bde016b",
                "isOverlay": true,
                "locateParams": "",
                "legend": "",
                "show": true,
                "remark": "",
                "source": "RESOURCE_ID",
                "type": "data",
                "resourceModelId": "1B30CBF1529149B7B7932E35FA6AA006",
                "subdomains": "",
                "defaultLoad": false,
                "name": "实有单位",
                "resourceTheme": [
                  {
                    "themeId": "0",
                    "themeName": "全部",
                    "themeStatus": "1",
                    "themeUserName": "admin",
                    "themeCreateDate": "2022-07-28T09:31:43.893+00:00",
                    "resourceDtoList": null
                  }
                ],
                "id": "538362f4-4ae0-453d-a932-d9800a04f37e",
                "fields": [
                  {
                    "prop": "entname",
                    "label": "企业名称"
                  },
                  {
                    "prop": "enttype",
                    "label": "企业类型"
                  },
                  {
                    "prop": "county",
                    "label": "所在区"
                  }
                ],
                "config": {
                  "cluster": 2,
                  "datasetName": "",
                  "icon": {
                    "width": 32,
                    "scale": 1,
                    "url": "ic_anquandao.svg",
                    "height": 32
                  },
                  "type": "database",
                  "fill": "rgba(0,0,255,0.2)",
                  "stroke": "rgba(0,0,255,1)",
                  "url": "",
                  "maxFeatures": 50000,
                  "tableName": "stg_ycsscjdglj_qysczt_ssdw",
                  "filter": "",
                  "initDataFields": "",
                  "geometryStyle": {
                    "pointModel": "scatter",
                    "emissionRate": 200,
                    "symbol": "",
                    "polygonFillColor": "rgba(0,0,255,0.2)",
                    "heightField": "",
                    "startScale": 3,
                    "gridFontSize": 14,
                    "endScale": 1.5,
                    "lifetime": 10,
                    "hasBubble": true,
                    "particlePixelSize": 10,
                    "strokeColorReverse": "rgba(0,0,255,1)",
                    "minHeight": 0,
                    "gridSize": 40,
                    "lineType": "solid",
                    "scanModel": "ring",
                    "particleType": "fire",
                    "RadiType": "cone",
                    "clampToS3M": false,
                    "burstSize": 600,
                    "minimumSpeed": 7,
                    "scatterType": "icon",
                    "heatMin": 0,
                    "textureModel": "unification",
                    "heatGradient": 0,
                    "maximumExplosionSize": 50,
                    "maximumSpeed": 9,
                    "minimumExplosionSize": 20,
                    "heatWeight": "",
                    "colorOption": 0,
                    "heatMax": 3,
                    "strokeWidth": 2,
                    "scanColor": "#fff400",
                    "gridFontColor": "#ffffff",
                    "scanSpeed": 1000,
                    "polygonModel": "single",
                    "gridGradient": 0,
                    "heatRadius": 15,
                    "textureEffect": "vertical",
                    "flowSpeed": 2,
                    "textureSpeed": 3,
                    "strokeColorForward": "rgba(0,0,255,1)",
                    "scanTexture": "ring2",
                    "repeat": 1,
                    "gridWeight": "",
                    "particleSize": 2,
                    "minimumParticleLife": 1.5,
                    "textureColor": "#fff400",
                    "scanPeriod": 2,
                    "symbolSize": 0,
                    "polygonStrokeWidth": 2,
                    "texture": "",
                    "symbolColor": "#ff0000",
                    "lineModel": "single",
                    "gridShowLabel": true,
                    "polygonStrokeColor": "rgba(0,0,255,1)",
                    "label": "",
                    "clampToGround": true,
                    "gravity": 0,
                    "bufferDistance": 1,
                    "maximumParticleLife": 1.8
                  },
                  "fillByFieldColorConfig": {
                    "mode": "single"
                  },
                  "datasourceName": "",
                  "fillByField": false,
                  "geometryType": "Point"
                },
                "propertyId": "",
                "key": "",
                "resourceCreateYear": "2023",
                "resourceType": "3B30CBF1529549B7B7932E35FA6AA198"
              },
              {
                "resourceId": "ff80808188ae5f10018968646a4b1047",
                "locateParams": "",
                "legend": "",
                "show": true,
                "remark": "城区范围",
                "source": "RESOURCE_ID",
                "type": "map",
                "resourceModelId": "1B30CBF1529149B7B7932E35FA6AA003",
                "subdomains": "",
                "defaultLoad": true,
                "name": "城区范围",
                "resourceTheme": [
                  {
                    "themeId": "4028d0ca827b45e001827c32a4fa0000",
                    "themeName": "基础地理",
                    "themeStatus": "1",
                    "themeUserName": "admin",
                    "themeCreateDate": "2022-08-08T06:44:30.026+00:00",
                    "resourceDtoList": null
                  }
                ],
                "id": "9aa40c15-baa5-452c-bfb8-d084aa1b9f1e",
                "fields": [],
                "config": {
                  "maximumLevel": 22,
                  "type": "supermap",
                  "url": "http://192.168.2.74:8884/gtis/map/rest/58cb76d5f41242d1aa6d9435dd94a467/rest/maps/cqfwx324",
                  "minimumLevel": 0
                },
                "propertyId": "",
                "key": "",
                "resourceCreateYear": "2023",
                "resourceType": "3B30CBF1529549B7B7932E35FA6AA197"
              },
              {
                "resourceId": "ff8080818334ea36018335d2610f000c",
                "isOverlay": false,
                "locateParams": "",
                "legend": "",
                "show": true,
                "remark": "",
                "source": "RESOURCE_ID",
                "type": "s3m",
                "resourceModelId": "1B30CBF1529149B7B7932E35FA6AA020",
                "subdomains": "",
                "defaultLoad": false,
                "name": "管线",
                "resourceTheme": [
                  {
                    "themeId": "4028d0ca827b45e001827c33bd100001",
                    "themeName": "城市管理",
                    "themeStatus": "1",
                    "themeUserName": "admin",
                    "themeCreateDate": "2022-08-08T06:45:41.765+00:00",
                    "resourceDtoList": null
                  }
                ],
                "id": "60b39eb1-3fd7-4a75-b242-649d0e4e8484",
                "fields": [],
                "config": {
                  "pbr": "pipeline",
                  "cluster": 0,
                  "isCameraController": false,
                  "icon": {
                    "width": 32,
                    "scale": 1,
                    "url": "",
                    "height": 32
                  },
                  "bottomAltitudeOffset": 0,
                  "orderIndependentTranslucency": true,
                  "type": "rest",
                  "lineWidth": 1,
                  "dthServerId": "",
                  "maxFeatures": 20000,
                  "dthColor": "rgba(255,0,0,0.3)",
                  "tableName": "",
                  "saturation": 1,
                  "directLightEnabled": false,
                  "haveFloors": false,
                  "initDataFields": "",
                  "geometryStyle": {
                    "pointModel": "scatter",
                    "emissionRate": 200,
                    "symbol": "",
                    "polygonFillColor": "rgba(0,0,255,0.2)",
                    "heightField": "",
                    "startScale": 3,
                    "gridFontSize": 14,
                    "endScale": 1.5,
                    "lifetime": 10,
                    "hasBubble": true,
                    "particlePixelSize": 10,
                    "strokeColorReverse": "rgba(0,0,255,1)",
                    "minHeight": 0,
                    "gridSize": 40,
                    "lineType": "solid",
                    "scanModel": "ring",
                    "particleType": "fire",
                    "RadiType": "cone",
                    "clampToS3M": false,
                    "burstSize": 600,
                    "minimumSpeed": 7,
                    "scatterType": "icon",
                    "heatMin": 0,
                    "textureModel": "unification",
                    "heatGradient": 0,
                    "maximumExplosionSize": 50,
                    "maximumSpeed": 9,
                    "minimumExplosionSize": 20,
                    "heatWeight": "",
                    "colorOption": 0,
                    "heatMax": 3,
                    "strokeWidth": 2,
                    "scanColor": "#fff400",
                    "gridFontColor": "#ffffff",
                    "scanSpeed": 1000,
                    "polygonModel": "single",
                    "gridGradient": 0,
                    "heatRadius": 15,
                    "textureEffect": "vertical",
                    "flowSpeed": 2,
                    "textureSpeed": 3,
                    "strokeColorForward": "rgba(0,0,255,1)",
                    "scanTexture": "ring2",
                    "repeat": 1,
                    "gridWeight": "",
                    "particleSize": 2,
                    "minimumParticleLife": 1.5,
                    "textureColor": "#fff400",
                    "scanPeriod": 2,
                    "symbolSize": 0,
                    "polygonStrokeWidth": 2,
                    "texture": "",
                    "symbolColor": "#ff0000",
                    "lineModel": "single",
                    "gridShowLabel": true,
                    "polygonStrokeColor": "rgba(0,0,255,1)",
                    "label": "",
                    "clampToGround": true,
                    "gravity": 0,
                    "bufferDistance": 1,
                    "maximumParticleLife": 1.8
                  },
                  "floors": [],
                  "dthClickBuffer": 0,
                  "alpha": 1,
                  "loadMode": "Child_Priority_NonLinear",
                  "directLightIntensity": 0.1,
                  "datasourceName": "",
                  "residentRootTile": false,
                  "fillByField": false,
                  "isGeoTilesRootNodeSave": false,
                  "fillForeColor": "#ffffff",
                  "cutLayerName": "HEAT",
                  "wireFrameMode": 1,
                  "datasetName": "",
                  "lineColor": "#ffffff",
                  "isGeoTilesSave": false,
                  "loadPBR": false,
                  "fill": "rgba(0,0,255,0.2)",
                  "stroke": "rgba(0,0,255,1)",
                  "url": "",
                  "filter": "",
                  "brightness": 1,
                  "isAttributesSave": false,
                  "dthBuffer": 0,
                  "contrast": 1,
                  "clearMemoryImmediately": true,
                  "fillStyle": 0,
                  "lodRangeScale": 1,
                  "fillByFieldColorConfig": {
                    "mode": "single"
                  },
                  "partlyTransparent": false,
                  "dthEnabled": false,
                  "geometryType": "LineString"
                },
                "propertyId": "",
                "key": "",
                "resourceCreateYear": "2022",
                "resourceType": "3B30CBF1529549B7B7932E35FA6AA202"
              },
              {
                "resourceId": "123",
                "isOverlay": true,
                "locateParams": "",
                "legend": "",
                "show": true,
                "remark": "",
                "source": "RESOURCE_ID",
                "type": "data",
                "subdomains": "",
                "defaultLoad": false,
                "name": "个体工商户",
                "id": "8038a265-8166-4394-bace-ebebbf6b2507",
                "fields": [],
                "config": {
                  "cluster": 2,
                  "datasetName": "",
                  "icon": {
                    "width": 32,
                    "scale": 1,
                    "url": "ic_anquangangting.svg",
                    "height": 32
                  },
                  "type": "database",
                  "fill": "rgba(0,0,255,0.2)",
                  "stroke": "rgba(0,0,255,1)",
                  "maxFeatures": 50000,
                  "tableName": "stg_ycsscjdglj_qysczt_gtgsh",
                  "filter": "",
                  "initDataFields": "",
                  "geometryStyle": {
                    "pointModel": "scatter",
                    "emissionRate": 200,
                    "symbol": "",
                    "polygonFillColor": "rgba(0,0,255,0.2)",
                    "heightField": "",
                    "startScale": 3,
                    "gridFontSize": 14,
                    "endScale": 1.5,
                    "lifetime": 10,
                    "hasBubble": true,
                    "particlePixelSize": 10,
                    "strokeColorReverse": "rgba(0,0,255,1)",
                    "minHeight": 0,
                    "gridSize": 40,
                    "lineType": "solid",
                    "scanModel": "ring",
                    "particleType": "fire",
                    "RadiType": "cone",
                    "clampToS3M": false,
                    "burstSize": 600,
                    "minimumSpeed": 7,
                    "scatterType": "icon",
                    "heatMin": 0,
                    "textureModel": "unification",
                    "heatGradient": 0,
                    "maximumExplosionSize": 50,
                    "maximumSpeed": 9,
                    "minimumExplosionSize": 20,
                    "heatWeight": "",
                    "colorOption": 0,
                    "heatMax": 3,
                    "strokeWidth": 2,
                    "scanColor": "#fff400",
                    "gridFontColor": "#ffffff",
                    "scanSpeed": 1000,
                    "polygonModel": "single",
                    "gridGradient": 0,
                    "heatRadius": 15,
                    "textureEffect": "vertical",
                    "flowSpeed": 2,
                    "textureSpeed": 3,
                    "strokeColorForward": "rgba(0,0,255,1)",
                    "scanTexture": "ring2",
                    "repeat": 1,
                    "gridWeight": "",
                    "particleSize": 2,
                    "minimumParticleLife": 1.5,
                    "textureColor": "#fff400",
                    "scanPeriod": 2,
                    "symbolSize": 0,
                    "polygonStrokeWidth": 2,
                    "texture": "",
                    "symbolColor": "#ff0000",
                    "lineModel": "single",
                    "gridShowLabel": true,
                    "polygonStrokeColor": "rgba(0,0,255,1)",
                    "label": "",
                    "clampToGround": true,
                    "gravity": 0,
                    "bufferDistance": 1,
                    "maximumParticleLife": 1.8
                  },
                  "fillByFieldColorConfig": {
                    "mode": "single"
                  },
                  "datasourceName": "",
                  "fillByField": false,
                  "geometryType": "Point"
                },
                "propertyId": "",
                "key": ""
              }
            ],
            "name": "影像资源",
            "show": true,
            "id": "357de2ed-bd94-4f86-b6a6-3a0f933886bf",
            "checkEnabled": false
          },
          {
            "resourceId": "ff8080818bfa3756018c3e1ec8980080",
            "isOverlay": false,
            "locateParams": "",
            "legend": "",
            "show": true,
            "remark": "",
            "source": "RESOURCE_ID",
            "type": "data",
            "resourceModelId": "1B30CBF1529149B7B7932E35FA6AA006",
            "subdomains": "",
            "defaultLoad": false,
            "name": "宜昌道路",
            "resourceTheme": [
              {
                "themeId": "ff80808186a557ab0186fd0144dc009a",
                "themeName": "测试主题",
                "themeStatus": "1",
                "themeUserName": "admin",
                "themeCreateDate": "2023-03-20T03:12:44.239+00:00",
                "resourceDtoList": null
              }
            ],
            "id": "7c899cf0-7f3e-4f96-b845-c019b0b1d995",
            "fields": [],
            "config": {
              "cluster": 0,
              "datasetName": "",
              "icon": {
                "width": 32,
                "scale": 1,
                "url": "",
                "height": 32
              },
              "type": "database",
              "fill": "rgba(0,0,255,0.2)",
              "stroke": "rgba(0,0,255,1)",
              "url": "",
              "maxFeatures": 20000,
              "tableName": "public_stg_mzj_dmxxfw_out_daolu",
              "filter": "",
              "initDataFields": "",
              "geometryStyle": {
                "pointModel": "scatter",
                "emissionRate": 200,
                "symbol": "",
                "polygonFillColor": "rgba(0,0,255,0.2)",
                "heightField": "",
                "startScale": 3,
                "gridFontSize": 14,
                "endScale": 1.5,
                "lifetime": 10,
                "hasBubble": true,
                "particlePixelSize": 10,
                "strokeColorReverse": "rgba(0,0,255,1)",
                "minHeight": 0,
                "gridSize": 40,
                "lineType": "solid",
                "scanModel": "ring",
                "particleType": "fire",
                "RadiType": "cone",
                "clampToS3M": false,
                "burstSize": 600,
                "minimumSpeed": 7,
                "scatterType": "icon",
                "heatMin": 0,
                "textureModel": "unification",
                "heatGradient": 0,
                "maximumExplosionSize": 50,
                "maximumSpeed": 9,
                "minimumExplosionSize": 20,
                "heatWeight": "",
                "colorOption": 0,
                "heatMax": 3,
                "strokeWidth": 2,
                "scanColor": "#fff400",
                "gridFontColor": "#ffffff",
                "scanSpeed": 1000,
                "polygonModel": "single",
                "gridGradient": 0,
                "heatRadius": 15,
                "textureEffect": "vertical",
                "flowSpeed": 2,
                "textureSpeed": 3,
                "strokeColorForward": "rgba(0,0,255,1)",
                "scanTexture": "ring2",
                "repeat": 1,
                "gridWeight": "",
                "particleSize": 2,
                "minimumParticleLife": 1.5,
                "textureColor": "#fff400",
                "scanPeriod": 2,
                "symbolSize": 0,
                "polygonStrokeWidth": 2,
                "texture": "",
                "symbolColor": "#ff0000",
                "lineModel": "single",
                "gridShowLabel": true,
                "polygonStrokeColor": "rgba(0,0,255,1)",
                "label": "",
                "clampToGround": true,
                "gravity": 0,
                "bufferDistance": 1,
                "maximumParticleLife": 1.8
              },
              "fillByFieldColorConfig": {
                "mode": "single"
              },
              "datasourceName": "",
              "fillByField": false,
              "geometryType": "LineString"
            },
            "propertyId": "",
            "key": "",
            "resourceCreateYear": "2023",
            "resourceType": "3B30CBF1529549B7B7932E35FA6AA198"
          },
          {
            "resourceId": "ff80808185090e6d01850f66b8680012",
            "isOverlay": false,
            "locateParams": "",
            "legend": "",
            "show": true,
            "remark": "",
            "source": "RESOURCE_ID",
            "type": "map",
            "subdomains": "",
            "defaultLoad": false,
            "name": "宜昌房屋面",
            "id": "30348b61-e694-4199-8e6b-d2c1e809de2a",
            "fields": [],
            "config": {},
            "propertyId": "",
            "key": "risk_census_country"
          },
          {
            "resourceId": "ff80808182d905340182d90c948a0001",
            "isOverlay": false,
            "locateParams": "",
            "legend": "土地利用现状图例.png",
            "show": true,
            "remark": "线",
            "source": "RESOURCE_ID",
            "type": "map",
            "resourceModelId": "1B30CBF1529149B7B7932E35FA6AA003",
            "subdomains": "",
            "defaultLoad": false,
            "name": "土地利用现状",
            "resourceTheme": [
              {
                "themeId": "0",
                "themeName": "全部",
                "themeStatus": "1",
                "themeUserName": "admin",
                "themeCreateDate": "2022-07-28T09:31:43.893+00:00",
                "resourceDtoList": null
              }
            ],
            "id": "a8c47df2-abb3-4275-b813-81b7bc7469fd",
            "fields": [],
            "config": {},
            "propertyId": "ff8080818bfa3756018c3e1ec8980080",
            "key": "",
            "resourceCreateYear": "2022",
            "resourceType": "3B30CBF1529549B7B7932E35FA6AA197"
          }
        ]
      },
      folderIcon: require("../assets/images/ic_zichanzu@2x.png"),
    }
  },
  methods: {
    handleTreeCheck(data, checked, node) {
      debugger
    },
    // checkBox的勾选
    handleCheck(data, checked, node) {
      // 重要，第三个参数会把所有子节点都勾选中
      this.$refs.tree.setChecked(data, checked, true);
    },

    isFolder(data) {
      return data.children || !data.type;
    },
  },
  created() {
    /*    let data = this.priData;
        this.filterTreeData(data.data);
        this.data = data.data;
        let keys = [];
        let filterDefaultLoad = (arr) => {
          arr.forEach((val, index) => {
            if (val.defaultLoad) {
              keys.push(val.id);
            }
            if (val.children && val.children.length > 0) {
              filterDefaultLoad(val.children);
            }
          });
        };
        filterDefaultLoad(this.data);
        this.defaultLoadKeys = keys;
        //加载默认图层
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.tree.setCheckedKeys(keys, true);
          }, 600)

        });*/
  },
  mounted() {
    // el-tree设置show-checkbox，这是一种把最外层的checkbox全部去掉的方法(可以模拟一种最外层不带checkBox的图层树)
    // 注：不能添加default-expand-all展开，不然checkbox全部都没了(有点卡bug的意味)
/*    let nodes = document.querySelector('.tree-box')
    let children = nodes.querySelectorAll('.el-tree-node')

    for (let i = 0; i < children.length; i++) {
      children[i].querySelector('.el-checkbox').style.display = 'none'
    }*/

  }
}
</script>


<style scoped>
.public-layer .custom-tree-node {
  height: 2rem;
  line-height: 2rem;
  display: flex;
  width: 100%;
}

.public-layer .custom-tree-node-notfolder {
  position: relative;
  /* right: 0.8rem;
  margin: 0 0.357rem; */
}

.public-layer .custom-tree-node > span:first-child {
  flex: 1;
  display: flex;
  align-items: center;
}

.public-layer .custom-tree-node > span:first-child > span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 10.3rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #000;
  vertical-align: middle;
}

.public-layer .custom-tree-node > span:first-child > img:first-child {
  margin: 0 0.357rem;
  vertical-align: middle;
  width: 1.429rem;
  height: 1.429rem;
}
</style>
<style>
</style>
