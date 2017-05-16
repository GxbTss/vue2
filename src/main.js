import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import routes from './router.config'


//把axios挂载到Vue原型上
Vue.prototype.$http = axios
    //使用路由
Vue.use(VueRouter)
const router = new VueRouter({
    routes
})
new Vue({
    router,
    el: '#app',
    render: h => h(App)
})