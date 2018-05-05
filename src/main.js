// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Fastclick from "fastclick"
// import VueLazyLoad from "vue-lazyload"
// import store from './store'
import router from './router'
import App from './App'

import components from './plugins/components'
Vue.use(components)

import axios from './plugins/http'
Vue.use(axios)

Fastclick.attach(document.body);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
