import axios from 'axios'
import Element from "element-ui";
import store from "./store";
import router from "./router";
axios.defaults.baseURL='http://138.49.185.193:80'
axios.interceptors.request.use(config => {
    console.log("Front interception")
    return config
})
axios.interceptors.response.use(response => {
    const res = response.data;
    console.log("Post interception")
    if (res.code === 200) {
        return response
    } else {
        Element.Message({
            message: response.data.msg,
            type: 'error',
            duration: 2 * 1000
        })
        return Promise.reject(response.data.msg)
    }
},  
error => {
    console.log('err' + error)// for debug
    if(error.response.data) {
        error.message = error.response.data.msg
    }
    if (error.response.status === 401) {
        store.commit('REMOVE_INFO');
        router.push({
            path: '/login'
        });
        error.message = 'Please log in again';
    }
    if (error.response.status === 403) {
        error.message = 'Insufficient permissions';
    }
    Element.Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
    })
    return Promise.reject(error)
})