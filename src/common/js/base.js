import axios from 'axios';

const base = {};

base.install = function(Vue, options){
  Vue.prototype.$axios = axios;
}

export default base;