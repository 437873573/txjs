import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import Login from 'components/login'
import Info from 'components/info'
import Bind from 'components/bind'
import Create from 'components/create'
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/bind',
      name:'bind',
      // redirect:'/bind/login',
      component:Bind,
      children:[
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'info',
          name: 'info',
          component: Info
        }
      ]
    },
    {
      path:'/create',
      name:'create',
      component:Create
    }
  ]
})
