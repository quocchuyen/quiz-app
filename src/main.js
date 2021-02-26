import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'



/* import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css' */


Vue.use(BootstrapVueIcons)
Vue.prototype.moment = moment
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
new Vue({
    render: h => h(App),
}).$mount('#app')