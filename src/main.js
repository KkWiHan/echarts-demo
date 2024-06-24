import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
//elementUI引入，用什么引入什么
import ElementUI from 'element-ui';
// elementUI的样式导入
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//vue-iclient3d-webgl组件库
import  '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css';
import VueiClient from '@supermap/vue-iclient3d-webgl';
Vue.use(VueiClient);

// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

// 注册全局组件
import SplashTest from './plugins/SplashTest/SplashTest.vue'
Vue.component(SplashTest.name, SplashTest)

//注册插件，在mySon组件中可以控制显隐
// import SplashTest from './plugins/SplashTest'
// Vue.use(SplashTest)

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
});
