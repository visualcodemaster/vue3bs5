import {createApp} from 'vue';
import { createStore } from 'vuex';

export const store =  createStore({
    state: {
        'authToken' : '',
        'baseUrl' : process.env.VUE_APP_BACKEND_URL,
    },

    getters: {
        getAuthToken(state){
            return state.authToken;
        },

        getBaseUrl(state){
            return state.baseUrl;
        }
    },

    mutations: {
        setAuthToken(state, token){
            state.authToken = token;
        },

        deleteAuthToken (){
            authHelper.deleteAuthToken();
        },
    },

    actions : {
        _login(context , payload) {
            return new Promise((resolve, reject) => {
             axios.post(`${context.state.baseUrl}/api/login`,payload)
             .then((response) => {
                 context.commit('setAuthToken',response.data.data.token)
                 resolve(response);
             }).catch(error => {
                 reject(error);
             })
            })
        },

        _logout(context , payload) {
            return new Promise((resolve, reject) => {
                axios.post(`${context.state.baseUrl}/api/logout`,payload)
                    .then((response) => {
                        context.commit('deleteAuthToken')
                        resolve(response);
                    }).catch(error => {
                    reject(error);
                })
            })
        }
    },

    modules: {},
});
createApp.use(store);
