import axios from "axios";
import {BASE_URL} from "./base.url";

//独立的axios实例，不会污染axios全局配置，可多次创建
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 50000
})

//请求拦截
instance.interceptors.request.use(options => {
    return options
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    //处理后台返回数据错误问题
    if(typeof response?.data == 'string'){

        return {}
    }
        return response
    },
    error => {
        return Promise.reject(error);
    })


class Request {
    constructor() {
        // this.baseUrl = BASE_URL;
    }
    //callback模式
    // send= function (options) {
    //     instance(options)
    //         .then(response => {
    //             options.callback(response)
    //         })
    //         .catch(error => {
    //             options.callback(error)
    //         });
    // }
    //promise 模式
    send=function (options){
       return new Promise((resolve, reject) => {
           instance(options).then(response=>{
               resolve(response.data)
           }).catch(error=>{
               reject(error)
           })
       })
    }

    get= function (config) {
        return this.send(
            Object.assign({}, config, { method:'GET' })
        );
    }

    post= function (config) {
        return this.send(
            Object.assign({}, config, { method:'POST' })
        );
    }


    put = function(config) {
        this.config = config;
        return this.send(
            Object.assign({}, config, { method: "PUT" })
        );
    };
}

export default new Request()