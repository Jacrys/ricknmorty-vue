import Vue from 'vue'
import App from './App.vue'
import '@progress/kendo-ui'
import '@progress/kendo-theme-material'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
