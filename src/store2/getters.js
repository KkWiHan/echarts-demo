

const getters = {
  systemConfig: state => state.app.systemConfig,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  mapReady: state => state.app.mapReady,
  config:state => state.app.config,
  legend:state => state.app.legend,
  commonLegendData:state => state.app.commonLegendData,
  // 全局加载的图层
  loadedLayers: state => state.app.loadedLayers,
  // 参与剖切的图层
  clipLayers: state=>state.app.clipLayers,
  //参与图层控制的图层
  controlLayers: state=>state.app.controlLayers,
  //已收藏的图层
  collectedLayers: state=>state.app.collectedLayers,
  layerTree: state => state.app.layerTree,
  loadLayer: state => state.app.loadLayer,
  unloadLayer: state => state.app.unloadLayer,
  //当前行政区
  district: state => state.app.district,
  //当前主题图表地图数据
  chartMapData: state => state.app.chartMapData,
  //当前激活组件名称
  activePanelName: state => state.app.activePanelName,
  //当前数据指标名称
  dataIndicatorName: state => state.app.dataIndicatorName,
  //当前大屏主体状态
  screenStatus: state => state.app.screenStatus,
  //当前行政区编码
  regionCode: state => state.app.regionCode,
  echartsDialogShow: state => state.app.echartsDialogShow
};
export default getters
