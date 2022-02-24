import Vue from "vue";
import App from "./App.vue";

// 引入全局样式文件；
import './assets/css/global.css'
import './assets/css/iconfont.css'

// 引入 echarts 主题文件；
import './assets/theme/custom'

// 引入 axios ；
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080/data/'

// 引入 echarts ；
import * as echarts from 'echarts'

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),

  // 将 axios、echarts 挂载到 vue 原型对象上；
  beforeCreate(){
    // axios
    Vue.prototype.$axios = axios;
    // echarts
    Vue.prototype.$echarts = echarts;
  }
}).$mount("#app");
