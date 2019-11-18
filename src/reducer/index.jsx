// 引入类型
// import { UPDATE_USERNAME } from '../consts';
import {Storage} from "../tools"
const UPDATE_USERNAME = "UPDATE_USERNAME"
// 默认状态数据
let defaultState = { message: '',status:"",isLogin:"" }
// let defaultState = { username: 'yyqh' }
// 定义函数
export default function reducer(state = defaultState, action) {
    // 定义结果对象
    let result = {};
    // 判断消息类型
    if (action.type === UPDATE_USERNAME) {

        console.log(action.data,"action")
        // 更新用户名
        result.message = action.data.message;
        result.status = action.data.status;
        result.isLogin = true;
        // 本地用户信息的存储
        Storage.setItem("loginUser", JSON.stringify(result))
    }
    // 合并成新对象
    return Object.assign({}, state, result)
}