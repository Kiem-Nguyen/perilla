import Vue from "vue";
import Vuex from 'vuex';
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
import router from "./router/index";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import store from './stores/index'
import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import {
    mapState,
    mapMutations,
    mapActions,
    mapGetters
} from 'vuex';

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(Vuex)
Vue.use(RouterPrefetch);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.prototype.$axios = axios

Vue.mixin({
    methods: {
        ...mapMutations('app', [
            'setByProp',
        ]),
        ...mapActions('app', [
            'getApi',
            'putApi',
            'postApi',
            'deleteApi',
        ]),
    },
    computed: {
        ...mapState('app', []),
        ...mapGetters('app', []),
    }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
