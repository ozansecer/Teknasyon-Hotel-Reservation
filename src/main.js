import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters/index'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false


new Vue({
  router,
  filters,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
