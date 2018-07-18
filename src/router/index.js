import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const bind = (resolve) => {
  import('views/bind').then((module) => {
    resolve(module)
  })
};
const create = (resolve) => {
  import('views/create').then((module) => {
    resolve(module)
  })
};
const index = (resolve) => {
  import('views/index').then((module) => {
    resolve(module)
  })
};
const total = (resolve) => {
  import('views/indexTotal').then((module) => {
    resolve(module)
  })
};
const news = (resolve) => {
  import('views/indexNews').then((module) => {
    resolve(module)
  })
};
const share = (resolve) => {
  import('views/share').then((module) => {
    resolve(module)
  })
};
const libraryBookList = (resolve) => {
  import('views/shareLibraryBookList').then((module) => {
    resolve(module)
  })
};
const libraryCarts = (resolve) => {
  import('views/shareLibraryCarts').then((module) => {
    resolve(module)
  })
};
const organization = (resolve) => {
  import('views/organization').then((module) => {
    resolve(module)
  })
};
const orgDetail = (resolve) => {
  import('views/orgDetail').then((module) => {
    resolve(module)
  })
};
const orgBookList = (resolve) => {
  import('views/orgBookList').then((module) => {
    resolve(module)
  })
};
const mall = (resolve) => {
  import('views/mall').then((module) => {
    resolve(module)
  })
};
const mallSort = (resolve) => {
  import('views/mallSort').then((module) => {
    resolve(module)
  })
};
const mallList = (resolve) => {
  import('views/mallList').then((module) => {
    resolve(module)
  })
};
const mallCarts = (resolve) => {
  import('views/mallCarts').then((module) => {
    resolve(module)
  })
};
const mallBill = (resolve) => {
  import('views/mallBill').then((module) => {
    resolve(module)
  })
};
const mallBook = (resolve) => {
  import('views/mallBook').then((module) => {
    resolve(module)
  })
};
const mallReturn = (resolve) => {
  import('views/mallReturn').then((module) => {
    resolve(module)
  })
};
const mallOrderLog = (resolve) => {
  import('views/mallOrderLog').then((module) => {
    resolve(module)
  })
};
const user = (resolve) => {
  import('views/user').then((module) => {
    resolve(module)
  })
};
const userBill = (resolve) => {
  import('views/userBill').then((module) => {
    resolve(module)
  })
};
const userBook = (resolve) => {
  import('views/userBook').then((module) => {
    resolve(module)
  })
};
const userSuccess = (resolve) => {
  import('views/userSuccess').then((module) =>{
    resolve(module)
  })
}
const userInfo = (resolve) => {
  import('views/userInfo').then((module) => {
    resolve(module)
  })
};
const userInfoClassModify = (resolve) => {
  import('views/userInfoClassModify').then((module) => {
    resolve(module)
  })
};
const userInfoMobileModify = (resolve) => {
  import('views/userInfoMobileModify').then((module) => {
    resolve(module)
  })
};
const userCoin = (resolve) => {
  import('views/userCoin').then((module) => {
    resolve(module)
  })
};
const userCredit = (resolve) => {
  import('views/userCredit').then((module) => {
    resolve(module)
  })
};
const userLibProof = (resolve) => {
  import('views/userLibProof').then((module) => {
    resolve(module)
  })
};
const userLibProofList = (resolve) => {
  import('views/userLibProofList').then((module) => {
    resolve(module)
  })
};
const userOrgProof = (resolve) => {
  import('views/userOrgProof').then((module) => {
    resolve(module)
  })
};
const userOrgProofList = (resolve) => {
  import('views/userOrgProofList').then((module) => {
    resolve(module)
  })
};
const classBookList = (resolve) => {
  import('components/classBookList').then((module) => {
    resolve(module)
  })
};
const rankList = (resolve) => {
  import('components/rankList').then((module) => {
    resolve(module)
  })
};
const search = (resolve) => {
  import('components/search').then((module) => {
    resolve(module)
  })
};
const course = (resolve) => {
  import('components/bookCourse').then((module) => {
    resolve(module)
  })
};
const newBook = (resolve) => {
  import('components/newBook').then((module) => {
    resolve(module)
  })
};
const book = (resolve) => {
  import('components/book').then((module) => {
    resolve(module)
  })
};
const start = (resolve) => {
  import('components/start').then((module) => {
    resolve(module)
  })
};
export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      component: start
    },
    {
      path: '/book/:id',
      name: 'book',
      component: book,
    },
    {
      path: '/course/:id',
      name: 'course',
      component: course,
    },
    {
      path: '/libProof/:id',
      name: 'userLibProof',
      component: userLibProof,
    },
    {
      path: '/orgProof/:id',
      name: 'userOrgProof',
      component: userOrgProof,
    },
    {
      path: '/newBook',
      name: 'newBook',
      component: newBook,
    },
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/classBookList',
      name: 'classBookList',
      component: classBookList,
    },
    {
      path: '/bind',
      name: 'bind',
      component: bind,
    },
    {
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/total',
      name: 'total',
      component: total,
      children: [
        {
          path: 'rankList',
          name: 'rankList',
          component: rankList,
        }
      ]
    },
    {
      path: '/news',
      name: 'news',
      component: news,
    },
    {
      path: '/share',
      name: 'share',
      component: share,
    },
    {
      path: '/share/libraryBookList',
      name: 'libraryBookList',
      component: libraryBookList,
    },
    {
      path: '/share/libraryCarts',
      name: 'libraryCarts',
      component: libraryCarts,
    },
    {
      path: '/organization',
      name: 'organization',
      component: organization,
    },
    {
      path: '/organization/detail/:id',
      name: 'orgDetail',
      component: orgDetail,
      children: [
        {
          path: '/organization/orgList',
          name: 'orgBookList',
          component: orgBookList,
        }
      ]
    },
    {
      path: '/mall',
      name: 'mall',
      component: mall,
      children: [
        {
          path: '/mall/sort',
          name: 'mallSort',
          component: mallSort,
        },
      ]
    },
    {
      path: '/mall/book/:id',
      name: 'mallBook',
      component: mallBook,
    },
    {
      path: '/mall/carts',
      name: 'mallCarts',
      component: mallCarts,
    },
    {
      path: '/mall/mallList',
      name: 'mallList',
      component: mallList,
    },
    {
      path: '/mall/return',
      name: 'mallReturn',
      component: mallReturn,
    },
    {
      path: '/mall/bill',
      name: 'mallBill',
      component: mallBill,
    },
    {
      path: '/mall/log',
      name: 'mallOrderLog',
      component: mallOrderLog,
    },
    {
      path: '/user',
      name: 'user',
      component: user,
    },
    {
      path: '/user/bill',
      name: 'userBill',
      component: userBill,
    },
    {
      path: '/user/book',
      name: 'userBook',
      component: userBook,
    },
    {
      path: '/user/success',
      name: 'userSuccess',
      component: userSuccess,
    },
    {
      path: '/user/info',
      name: 'userInfo',
      component: userInfo,
      children: [
        {
          path: '/user/info/classModify',
          name: 'userInfoClassModify',
          component: userInfoClassModify,
        },
        {
          path: '/user/info/mobileModify',
          name: 'userInfoMobileModify',
          component: userInfoMobileModify,
        }
      ]
    },
    {
      path: '/user/coin',
      name: 'userCoin',
      component: userCoin,
    },
    {
      path: '/user/credit',
      name: 'userCredit',
      component: userCredit,
    },
    {
      path: '/user/libProofList',
      name: 'userLibProofList',
      component: userLibProofList,
    },
    {
      path: '/user/orgProofList',
      name: 'userOrgProofList',
      component: userOrgProofList,
    },
  ]
})
