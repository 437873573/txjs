import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const Index = (resolve) => {
  import('views/index').then((module) => {
    resolve(module)
  })
};
const IndexBook = (resolve) => {
  import('views/indexBook').then((module) => {
    resolve(module)
  })
};
const Share = (resolve) => {
  import('views/share').then((module) => {
    resolve(module)
  })
};
const Mall = (resolve) => {
  import('views/mall').then((module) => {
    resolve(module)
  })
};
const User = (resolve) => {
  import('views/user').then((module) => {
    resolve(module)
  })
};
const UserInfo = (resolve) => {
  import('views/userInfo').then((module) => {
    resolve(module)
  })
};
const ClassSetting = (resolve) => {
  import('views/classSetting').then((module) => {
    resolve(module)
  })
};
const Bind = (resolve) => {
  import('views/bind').then((module) => {
    resolve(module)
  })
};
const Create = (resolve) => {
  import('views/create').then((module) => {
    resolve(module)
  })
};
const Login = (resolve) => {
  import('components/login').then((module) => {
    resolve(module)
  })
};
const Info = (resolve) => {
  import('components/info').then((module) => {
    resolve(module)
  })
};
const Shelf = (resolve) => {
  import('components/shelf').then((module) => {
    resolve(module)
  })
};

const Order = (resolve) => {
  import('components/order').then((module) => {
    resolve(module)
  })
};
const Proof = (resolve) => {
  import('components/proof').then((module) => {
    resolve(module)
  })
};
const OrderList = (resolve) => {
  import('components/orderList').then((module) => {
    resolve(module)
  })
};
const NewBook = (resolve) => {
  import('components/newBook').then((module) => {
    resolve(module)
  })
};
const MyBook = (resolve) => {
  import('components/MyBook').then((module) => {
    resolve(module)
  })
};
const BookDetail = (resolve) => {
  import('base/bookDetail').then((module) => {
    resolve(module)
  })
}

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: ':id',
          name: 'indexBook',
          component: IndexBook
        }
      ]
    },
    {
      path: '/share',
      name: 'share',
      component: Share,
      children: [
        {
          path: 'shelf',
          name: 'shelf',
          component: Shelf,
        },

      ]
    },
    {
      path: '/mall',
      name: 'mall',
      component: Mall,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children:[
        {
          path:'userInfo',
          name:'userInfo',
          component:UserInfo,
          children:[
            {
              path:'classSetting',
              name:'classSetting',
              component:ClassSetting
            }
          ]
        }
      ]
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind,
      children: [
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
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/proof',
      name: 'proof',
      component: Proof
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderList,
    },
    {
      path: '/newBook',
      name: 'newBook',
      component: NewBook,
    },
    {
      path: '/myBook',
      name: 'myBook',
      component: MyBook,
    }
  ]
})
