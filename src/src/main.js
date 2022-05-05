// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/stylesheets/base.css';
import './assets/design/app.scss';
import store from './store';

window.wsScheme = window.location.protocol == "https:" ? "wss" : "ws";

// HTTP
Vue.use(VueResource);

if (process.env.NODE_ENV === 'development') {
  Vue.http.options.root = 'http://127.0.0.1:8000';
  window.wsRoot = 'ws://127.0.0.1:8000'
} else {
  Vue.http.options.root = window.location.protocol + "//" + window.location.host
  window.wsRoot = window.wsScheme + "://" + window.location.host
}

Vue.use(BootstrapVueIcons);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
// Vue.use(bootstrap);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
