/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import axios from 'axios';
import { message } from 'antd';
import { Storage, isApp } from "../tools"

// 没有loading的接口
const noLoadingArr = ['zsph-bs-bankcard/bankCard/account/balanceQuery/me']
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

axios.interceptors.request.use((config) => {
    const users = Storage.getItem("loginUser") && JSON.parse(Storage.getItem("loginUser"))
    // !noLoadingArr.includes(config.url) && showLoading()
    if (users.isLogin) {
        config.headers["access-token"] = `${users.message}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

const defaultOptions = {
    // baseURL: baseURL,
    method: 'get',
    // timeout: 5000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "terminal-version": 1,
        "terminal-id": 'H5'
    },
}

const  Http = {
    base: (options) => {
        return new Promise((resolve, reject) => {
            axios({...defaultOptions, ...options}).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    get: function (url, params) {
        let options = {
            url:url,
            method: 'get',
            params:params
        };
        return this.base(options);
    },
    post: function (url, params) {
        let options = {
            url:url,
            method: 'post',
            data:params
        };
        return this.base(options);
    },
    put: function (url, params) {
        let options = {
            url:url,
            method: 'put',
            data:params
        };
        return this.base(options);
    },
    delete: function (url, params) {
        let options = {
            url:url,
            method: 'delete',
            data:params
        };
        return this.base(options);
    },

}
export default Http;
/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({url, msg = '接口异常', headers}) =>
    axios.get(url, headers).then(res => res.data).catch(err => {
       console.log(err);
       message.warn(msg);
    });

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({url, data, msg = '接口异常', headers}) =>
    axios.post(url, data, headers).then(res => res.data).catch(err => {
        console.log(err);
        message.warn(msg);
    });
