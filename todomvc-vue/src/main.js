import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import '../node_modules/todomvc-common/base.css'
import '../node_modules/todomvc-app-css/index.css'

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
