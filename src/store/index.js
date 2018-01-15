import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'
import profile from './modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        auth,
        profile
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {}
})