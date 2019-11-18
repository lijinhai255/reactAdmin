// 引入类型
import { UPDATE_USERNAME } from '../consts';
import { message } from 'antd';
import { gitOauthLogin } from '../axios'
// 引入axios
import axios from 'axios';
// 消息
export let updateUsername = data => ({ data, type: UPDATE_USERNAME })


// 异步action
// 登录消息
export let login = data =>
    // 异步action的返回值是回调函数
    dispatch => {
        // 发布异步请求
        // axios
        //     .post('/dataslist.json', data)
        //     // 监听数据返回
        //     .then(({ data }) => {
        //         // 如果登录成功
        //         if (data.errno === 0) {
        //             // 发送同步消息，存储数据
        //             return dispatch(updateUsername(data.data))
        //         }
        //         // 提示错误
        //         // Toast.info(data.msg)
        //         message.info('data.msg');
        //     })
        const { userName, password } = data
        gitOauthLogin(userName, password).then((...args) => {
            if (args[0] && args[0].status === 0) {
                // console.log("登陆成功了")
                return dispatch(updateUsername(args[0]))
            }
            // if(data.status === 0){
            //     console.log("登陆成功了")
            // }
        })
    }
