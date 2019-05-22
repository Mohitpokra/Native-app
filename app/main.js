import Vue from 'nativescript-vue'
import routes from '~/router'
import store from '~/store'
import sideDrawer from '~/components/layout/SideDrawer'
import drawerContent from '~/components/layout/DrawerContent'
import VueDevtools from 'nativescript-vue-devtools'
import RadDataFormPlugin from 'nativescript-ui-dataform/vue';
import RadChartPlugin from 'nativescript-ui-chart/vue';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import Pager from 'nativescript-accordion/vue';

Vue.use(RadChartPlugin);
Vue.use(Pager);
Vue.use(require('vue-moment'));
Vue.use(VueDevtools);
Vue.use(RadDataFormPlugin);
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/css/fontawesome.min.css',
  'far': './assets/css/regular.min.css',
  'fas': './assets/css/solid.min.css',
  'fab': './assets/css/brands.min.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer);
Vue.registerElement('CheckBox', () => require('nativescript-checkbox').CheckBox, {
  model: {
    prop: 'checked',
    event: 'checkedChange'
  }
});
Vue.registerElement('RadioGroup', () => require('nativescript-radiobutton').RadioGroup)
Vue.registerElement('RadioButton', () => require('nativescript-radiobutton').RadioButton)
Vue.registerElement(
  'CardView',
  () => require('nativescript-cardview').CardView
);
Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);

// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$routes = routes

new Vue({
  store,
  render(h) {
    if(store.state.auth.token) {
      return h(
        sideDrawer,
        [
          h(drawerContent, { slot: 'drawerContent' }),
          h(routes.Home, { slot: 'mainContent' })
        ]
      )
    } else {
      return h(
        sideDrawer,
        [
          h(drawerContent, { slot: 'drawerContent' }),
          h(routes.HomeScreen, { slot: 'mainContent' })
        ]
      )
    }
  }
}).$start()