import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const Book = (resolve) => {
  import('views/Book').then((module) => {
    resolve(module)
  })
};
const Index = (resolve) => {
  import('views/index').then((module) => {
    resolve(module)
  })
};
const News = (resolve) => {
  import('views/news').then((module) => {
    resolve(module)
  })
};
const Share = (resolve) => {
  import('views/share').then((module) => {
    resolve(module)
  })
};
const ClassBookList = (resolve) => {
  import('components/classBookList').then((module) => {
    resolve(module)
  })
};
const Shelf = (resolve) => {
  import('components/shelf').then((module) => {
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
const UserBook = (resolve) => {
  import('views/userBook').then((module) => {
    resolve(module)
  })
};
const UserInfo = (resolve) => {
  import('views/userInfo').then((module) => {
    resolve(module)
  })
};
const UserCoin = (resolve) => {
  import('views/userCoin').then((module) => {
    resolve(module)
  })
};
const UserCredit = (resolve) => {
  import('views/userCredit').then((module) => {
    resolve(module)
  })
};
const UserProof = (resolve) => {
  import('views/userProof').then((module) => {
    resolve(module)
  })
};
const UserCollect = (resolve) => {
  import('views/userCollect').then((module) => {
    resolve(module)
  })
}
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
const NewBook = (resolve) => {
  import('components/newBook').then((module) => {
    resolve(module)
  })
};

const BookDetail = (resolve) => {
  import('base/bookDetail').then((module) => {
    resolve(module)
  })
};
const Search = (resolve) => {
  import('views/search').then((module) => {
    resolve(module)
  })
};

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
          component: Book
        },
      ]
    },
    {
      path: '/share',
      name: 'share',
      component: Share,
      children: [
        {
          path: 'classBookList',
          name: 'classBookList',
          component: ClassBookList,
        },
        {
          path: 'shelf',
          name: 'shelf',
          component: Shelf,
        },
        {
          path: ':id',
          name: 'shareBook',
          component: Book
        }
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
      children: [
        {
          path: 'userInfo',
          name: 'userInfo',
          component: UserInfo,
          children: [
            {
              path: 'classSetting',
              name: 'classSetting',
              component: ClassSetting
            }
          ]
        },
        {
          path: 'userCoin',
          name: 'userCoin',
          component: UserCoin,
        },
        {
          path: 'userCredit',
          name: 'userCredit',
          component: UserCredit,
        },
        {
          path: 'userBook',
          name: 'userBook',
          component: UserBook,
        },
        {
          path: 'userProof',
          name: 'userProof',
          component: UserProof,
        },
        {
          path: 'userCollect',
          name: 'userCollect',
          component: UserCollect,
        },
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
      path: '/newBook',
      name: 'newBook',
      component: NewBook,
    },

    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [
        {
          path: ':id',
          name: 'searchBook',
          component: Book
        }
      ]
    },
    {
      path: '/news',
      name: 'news',
      component: News
    }
  ]
})
