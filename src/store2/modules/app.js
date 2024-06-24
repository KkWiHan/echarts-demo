import Cookies from 'js-cookie'
import {findByKeys} from "@/api/common/configService";


const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    visitedViews: [],
    mapReady: false,
    config: null,
    // 图片图例，主要是专题地图，三维地下管线
    legend: {},
    // 点图例，动态展示
    commonLegendData: [],
    loadedLayers: [],
    clipLayers: [{id: "all", name: "全部图层"}],
    //参与图层控制的图层
    controlLayers: [],
    //图层收藏列表
    collectedLayers:[],
    systemConfig: {},
    //当前行政区范围,只到市级
    district: '江苏省',
    //大屏主体状态 CesiumMap EchartsMap
    screenStatus: 'EchartsMap',
    //当前区划行政区编码，会到区县级
    regionCode: '320000',
    /**
     * 当前echarts地图的数据
     * 格式：
     * {
     *     "南京市"：{
     *         label:'栋数',
     *         number:1000,
     *         unit: '万栋'
     *     }
     * }
     */
    chartMapData:{},
    /**
     * name: 当前激活组件code
     * check：是否被激活
     */
    activePanelName: {
      name: '',
      check: false
    },
    /**
     * 数据指标名称
     * 示例：城镇房屋总栋数
     */
    dataIndicatorName: '',
    echartsDialogShow: false,
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({name: view.name, path: view.path})
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index;
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i;
          break
        }
      }
      state.visitedViews.splice(index, 1)
    },
    ADD_CLIP_LAYER: (state, layer) => {
      state.clipLayers.push(layer);
    },
    READY_FOR_MAP: (state) => {
      state.mapReady = true;
    },
    ADD_LOADED_LAYER: (state, layer) => {
      state.loadedLayers.push(layer);
    },
    SET_CONFIG(state, config) {
      state.config = config;
    },
    CHANGE_CONTROL_LAYERS(state,layers){
      state.controlLayers = layers;
    },
    ADD_CONTROL_LAYER(state,layer){
      state.controlLayers.push(layer);
    },
    ADD_COLLECTED_LAYER(state,id){
      state.collectedLayers.push(id);
    },
    DELETE_COLLECTED_LAYER(state,id){
      let index = state.collectedLayers.findIndex(val=>val==id);
      state.collectedLayers.splice(index,1);
    },
    SET_LEGEND(state,legend){
      state.legend = legend;
    },
    SET_COMMON_LEGEND_DATA(state,legend){
      state.commonLegendData = legend;
    },
    SET_SYSTEM_CONFIG: (state, config) => {
      state.systemConfig = config;
    },
    SET_DISTRICT: (state, district) => {
      state.district = district;
    },
    SET_ECHARTS_MAP_DATA: (state, data) => {
      state.chartMapData = data;
    },
    SET_ACTIVE_PANEL_NAME: (state, data) => {
      state.activePanelName = data;
    },
    SET_DATA_INDICATOR_NAME: (state, data) => {
      state.dataIndicatorName = data;
    },
    SET_SCREEN_STATUS: (state, screenStatus) => {
      state.screenStatus = screenStatus;
    },
    SET_REGION_CODE: ( state, code ) => {
      state.regionCode = code;
    },
    SET_ECHARTS_DIALOG_SHOW:(state, val) => {
      state.echartsDialogShow = val;
    }
  },
  actions: {
    ToggleSideBar({commit}) {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews({commit}, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({commit, state}, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view);
        resolve([...state.visitedViews])
      })
    },
    addClipLayer({commit}, layer) {
      commit('ADD_CLIP_LAYER', layer)
    },
    removeClipLayer({commit}, layerId) {
      commit('REMOVE_CLIP_LAYER', layerId)
    },
    readyForMap({commit}) {
      commit('READY_FOR_MAP')
    },
    addLoadedLayer({commit}, layer) {
      commit('ADD_LOADED_LAYER', layer)
    },
    removeLoadedLayer({commit}, layerId) {
      commit('REMOVE_LOADED_LAYER', layerId)
    },
    setConfig({commit}, config) {
      commit('SET_CONFIG', config)
    },
    changeControlLayers({commit},layers){
      commit('CHANGE_CONTROL_LAYERS',layers);
    },
    addControlLayer({commit},layer){
      commit('ADD_CONTROL_LAYER',layer);
    },
    addCollectedLayer({commit},id){
      commit('ADD_COLLECTED_LAYER',id);
    },
    deleteCollectedLayer({commit},id){
      commit('DELETE_COLLECTED_LAYER',id);
    },
    setLegend({commit},legend){
      commit('SET_LEGEND',legend)
    },
    setCommonLegendData({commit},legend){
      commit('SET_COMMON_LEGEND_DATA',legend)
    },
    setSystemConfig({commit}) {
      findByKeys(["sys.logo", "sys.copyright"]).then(res => {
        let val = {};
        res.forEach(v => {
          val[v.key] = v.value;
        });
        commit('SET_SYSTEM_CONFIG', val)
      });
    },
    setDistrict({commit}, district) {
      commit('SET_DISTRICT', district)
    },
    setChartsMapData({commit}, data) {
      commit('SET_ECHARTS_MAP_DATA', data)
    },
    setActivePanelNameAction({commit}, data) {
      commit('SET_ACTIVE_PANEL_NAME', data)
    },
    setDataIndicatorNameAction({commit}, data) {
      commit('SET_DATA_INDICATOR_NAME', data)
    },
    setScreenStatus({commit}, screenStatus) {
      commit('SET_SCREEN_STATUS', screenStatus)
    },
    setRegionCode( { commit }, code ) {
      commit( 'SET_REGION_CODE', code )
    },
    setEchartsDialogShow({commit}, val){
      commit('SET_ECHARTS_DIALOG_SHOW', val);
    }
  }
};

export default app
