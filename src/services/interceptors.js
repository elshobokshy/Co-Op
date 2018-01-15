import Vue from 'vue'
import api from '@/api'
import ls from '@/services/ls'
import store from '@/store'

export default {
    install: (Vue, options = {}) => {
        api.interceptors.request.use(function (config) {
            if(ls.get('token')) {
                if (!config.params) {
                    config.params = {}
                }

                config.params.token = ls.get('token')

            }
            return config
        }, function (error) {
            return Promise.reject(error);
        });

        api.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }
}