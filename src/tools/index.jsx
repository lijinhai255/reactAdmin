import { message } from 'antd'
export const Storage = {
    setItem(key, value) {
        key && value && localStorage.setItem(key, value)
    },
    getItem: (key) => {
        return (key && localStorage.getItem(key)) || ''
    },
    removeItem: (key) => {
        key && localStorage.removeItem(key)
    },
    clear: () => {
        localStorage.clear()
    }
}
//定义 会话存储的方法
export const SessionStorage = {
    setItem(key, value) {
        key && value && sessionStorage.setItem(key, value)
    },
    getItem: (key) => {
        return (key && sessionStorage.getItem(key)) || ''
    },
    removeItem: (key) => {
        key && sessionStorage.removeItem(key)
    },
    clear: () => {
        sessionStorage.clear()
    }
}

export const renderPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export const urlkey = (url) => {
    let params = {};
    if (url) {
        let urls = url.split("?");
        if (urls.length > 1) {
            let urls = url.split("?");
            let arr = urls[1].split("&");
            for (let i = 0, l = arr.length; i < l; i++) {
                let a = arr[i].split("=");
                params[a[0]] = a[1];
            }
        }
    }
    return params;
}

export const Validate = {
    validmobile: (value, callback) => {
        if (!value || !/^1\d{10}/.test(value)) {
            return callback(new Error('请输入正确的手机号'))
        } else {
            callback()
        }
    },
    validPwd: (value, callback) => {
        var m = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
        if (value.match(m)) {
            callback()
        } else {
            return callback(new Error('密码为6-18位字母和数字组合'))
        }
        //
        // if (!value || !/^[\w|\W]{6,18}$/.test(value)) {
        //     return callback(new Error('密码为6-18位字母和数字组合'))
        // } else {
        //     callback()
        // }
    },
    validCode: (value, callback) => {
        if (!value || value.length != 6) {
            return callback(new Error('请输入正确的验证码'))
        } else {
            callback()
        }
    },
}
// iphonex xs xr xsmax 判断
export function isIphonX() {
    // iPhone X、iPhone XS
    var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
    // iPhone XS Max
    var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
    // iPhone XR
    var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
    // console.log(isIPhoneX,isIPhoneXR,isIPhoneXSMax,'机型判断')
    return isIPhoneX || isIPhoneXR || isIPhoneXSMax
}
export function isIphone() {
    return /iphone/gi.test(window.navigator.userAgent)
}
// history 是否存在
export function isHistory() {
    return window.history && window.history.length
}
export function isApp() {
    return /PuhuiApp/.test(navigator.userAgent);
}
export function AppVersion() {
    return navigator.userAgent.split('PuhuiApp/')[1]
}
// 类名拆分
export function devideClass(...args) {
    return args.join(' ');
}

export function toMoneyString(val) {
    if (!val) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function isNotEmpty(val) {
    return val && val.length;
}

function closeWindow() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        window.WeixinJSBridge.call('closeWindow'); //微信
    } else if (ua.indexOf("alipay") != -1) {
        window.AlipayJSBridge.call('closeWebview'); //支付宝
    } else if (ua.indexOf("baidu") != -1) {
        window.BLightApp.closeWindow(); //百度
    } else {
        window.close(); //普通浏览器
    }
}

// 关闭app页面
export function closePage() {
    isApp() && window.android.closePage()
}

// 返回时执行的函数
function _listenerFun() {
    // let obj = window._popStateObj;
    pushHistory(window.location.href)
    // if(obj.alertmessage ){

    //     return false;
    // }
    // obj.alertmessage = 
    popState.cb()
}

function pushHistory(url) {
    var url = url || window.location.href
    window.history.pushState({ page: 1 }, null, url);
}
/**
 *     返回监控
 *     cb   Function  成功的函数
 * 
 */
function popState(cb) {
    // console.log(cb,"cbcbcb")
    if (!isApp()) {
        popState.cb = cb || function () { }
        pushHistory()
        window.addEventListener('popstate', _listenerFun);
    }
}
function removeState() {
    popState.message = null
    window.removeEventListener('popstate', _listenerFun);
}

function getNowFormatDate(param) {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var seperator3 = '+';
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();
    if (m >= 1 && m <= 9) {
        m = "0" + m;
    }
    if (d >= 0 && d <= 9) {
        d = "0" + d;
    }
    if (param == 'ymd') {
        var currentdate = y + seperator1 + m + seperator1 + d;
    } else {
        var currentdate = y + seperator1 + m + seperator1 + d
            + seperator3 + h + seperator2 + i
            + seperator2 + s;
    }
    return currentdate;
}

export function debounce(cb, t) {
    let timeout = null;
    return function () {
        if (timeout) {
            return;
        }
        timeout = setTimeout(cb, t ? t : 1000)
    }
}
export {
    popState,
    removeState,
    pushHistory,
    getNowFormatDate
}