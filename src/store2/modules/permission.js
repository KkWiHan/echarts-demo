// import {asyncComponents} from '@/router/map'
// import {getRouters} from '@/api/menu'
// import {getMenuByCode} from "@/api/cim/menuService";

// const permission = {
//   state: {
//     routes: [],
//     addRoutes: []
//   },
//   mutations: {
//     SET_ROUTES: (state, routes) => {
//       state.addRoutes = routes;
//       state.routes = routes;
//     }
//   },
//   actions: {
//     // 生成路由
//     GenerateRoutes({commit}) {
//       return new Promise(resolve => {
//         // 向后端请求路由数据
//         // getRouters().then(res => {
//         //   const accessedRoutes = filterAsyncRouter(res.data);
//         //   accessedRoutes.push({ path: '*', redirect: '/404', hidden: true });
//         //   commit('SET_ROUTES', accessedRoutes);
//         //   resolve(accessedRoutes)
//         // })
//         // TODO 在这里向后台请求权限数据
//         getMenuByCode("map").then(data => {
//           let permissions = {};
//           // add by yangyi on 2022/09/14 将menuCode加入到权限
//           let menuCodes = [];
//           let handle = (list) => {
//             list.forEach(val => {
//               if(val.enabled !== false&&val.enabled !== 0){
//                 val.menuCode&&menuCodes.push(val.menuCode);
//                 if(val.menuUrl){
//                   permissions[val.menuUrl] = val;
//                 }
//               }
//               if (val.children && val.children.length > 0) {
//                 handle(val.children);
//               }
//             });
//           };
//           handle(data);
//           commit('SET_PERMISSIONS', menuCodes);
//           const accessedRoutes = filterAsyncRouter(asyncComponents, permissions);
//           commit('SET_ROUTES', accessedRoutes);
//           resolve(accessedRoutes);
//         });
//       })
//     },
//     setRoutes(context, routes) {
//       context.commit("SET_ROUTES", routes);
//     }
//   }
// };

// // 遍历后台传来的路由字符串，转换为组件对象
// function filterAsyncRouter(asyncRouterMap, permissions) {
//   return asyncRouterMap.filter(route => {
//     route.shrink = false;
//     // 根据权限字符进行过滤和筛选
//     if (route.children != null && route.children && route.children.length) {
//       route.children = filterAsyncRouter(route.children, permissions)
//     }
//     route.meta = route.meta || {};
//     let per = permissions[route.path];
//     if(per){
//       route.meta.title = permissions[route.path].title;
//       return true;
//     }else{
//       return false;
//     }
//   })
// }

// export const loadView = (view) => { // 路由懒加载
//                                     // return (resolve) =>  require([`@/views/${view}`], resolve)
// };

// export default permission
