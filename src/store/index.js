import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from './modules/app'
import menus from './modules/menus'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    menus,
  },
  getters,
});

export default store;
