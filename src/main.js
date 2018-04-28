// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import Fastclick from "fastclick"
import VueLazyLoad from "vue-lazyload"
// import store from './store'
import router from './router'
import App from './App'
import Axios from 'axios'

Vue.prototype.$axios=Axios;
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
