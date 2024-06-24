import SplashTest from './SplashTest.vue'
// TODO 注册插件，有问题未使用，待完善
export default {
    install: function (Vue, options) {
        // 1.获取构造函数
        const constructor = Vue.extend(SplashTest)
        // 2. 实例化组件对象
        const instance = new constructor()

        Vue.prototype.$ToggleSplash = (options = {}) => {
            // 挂载组件
            instance.$mount()

            /*
            // 获取实际的 DOM 元素
            const element = instance.$el
            // 修改 position 属性
            element.style.position = 'absolute'; // 例如，将 position 从static改为 absolute
            */

            // 将组件元素添加到body中, 挂载到body上看不见(因为appendChild添加的元素默认positon为static，可以把上面代码注开试试)
            // 在mySon中打了个名为myList的id
            document.getElementById("myList").appendChild(instance.$el)

            // 改变实例中data的值
            instance.isShow = !instance.isShow

        }

    }
}
