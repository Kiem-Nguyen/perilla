import Vue from 'vue';
import Vuex from 'vuex';
import appModule from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    modules: {
        app: appModule,
    },
    getters: {},
});