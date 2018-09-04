// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
// import 'bluebird'
import Vue from 'vue'
import App from './App'
import router from './router'
import base from "./common/js/base";

import './common/style/icon.css';
import './common/style/base.less';
Vue.use(base);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
