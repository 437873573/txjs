// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Fastclick from "fastclick"
import {weixin} from "./common/js/weixin";
import VueLazyLoad from "vue-lazyload"
import store from './store'
import router from './router'
import App from './App'

import components from './plugins/components'
Vue.use(components);

import axios from './plugins/http'
Vue.use(axios);

Fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('common/img/lazy.png'),
  error: require('common/img/error.png')
});

Vue.config.productionTip = false;

if (weixin.isweixin()) {
  weixin.getUserInfo()
} else {
  alert('请在微信端打开')
}
import VueAMap from 'vue-amap'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'd4746c1af5f0760aed8b0ee002dc540b',
  plugin: ['AMap.Geolocation'],
  v: '1.4.8'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
