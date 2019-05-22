import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import sideDrawer from './modules/sideDrawers';
import { alert } from './modules/alert';
import { auth } from './modules/auth';
import { ui } from './modules/ui';
import { dashboard } from './modules/dashboard';

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

let store = new Vuex.Store({
  modules: {
    dashboard,
    sideDrawer,
    alert,
    auth,
    ui
  },
  strict: debug
})

Vue.prototype.$store = store

export default store