import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n

import './styles/index.scss' // global css

import App from "./App";
import generateRouter from "./router";
import store from "./store";
import Layout from "@/views/Layout";



Vue.component('Layout', Layout)
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

localStorage.removeItem('menus')
localStorage.removeItem('config');


generateRouter().then(router=> {
  new Vue({
    el: "#app",
    router,
    store,
    template: "<App/>",
    components: { App },
    beforeCreate(){
      store.dispatch('GetConfig')
    }
  });
})

