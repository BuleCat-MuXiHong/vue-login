import Vue from 'vue'
import Router from 'vue-router'
import Rest from'@/assets/css/reset.css'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name:'login',
      component:Login
    },{
      path: '/home',
      name:'home',
      component:Home
    }
  ]
})
