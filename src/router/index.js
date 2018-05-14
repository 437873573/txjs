import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home'
import Index from 'components/index'
import Library from 'components/library'
import Mall from 'components/mall'
import User from 'components/user'
import Login from 'components/login'
import Info from 'components/info'
import Bind from 'components/bind'
import Create from 'components/create'
import Shelf from 'components/shelf'
import BookDetail from 'components/bookDetail'
import Order from 'components/order'
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/index',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'index',
          name: 'index',
          component: Index,
          children:[
            {
              path:':id',
              name:'bookDetail',
              component:BookDetail
            }
          ]
        },
        {
          path: 'library',
          name: 'library',
          component: Library,
          children:[
            {
              path:'shelf',
              name:'shelf',
              component:Shelf,
            },
            {
              path:':id',
              name:'bookDetail',
              component:BookDetail,
            }
          ]
        },
        {
          path: 'mall',
          name: 'mall',
          component: Mall,
        },
        {
          path: 'user',
          name: 'user',
          component: User,
        },
      ]
    },
    {
      path:'/bind',
      name:'bind',
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
    },
    {
      path:'/order',
      name:'order',
      component:Order
    }
  ]
})
