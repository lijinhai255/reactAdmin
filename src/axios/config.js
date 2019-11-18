import { func } from "prop-types";

/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
// const BASE_URL = 'http://test-hyq.rest.zspuhui.com/'
const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://test-hyq.rest.zspuhui.com' : 'http://appgw.zspuhui.com:8000';
console.log(BASE_URL,"BASE_URL")
// const BASE_URL1 = process.env.NODE_ENV === 'production' ? 'http://test-admin.zspuhui.com' : 'http://admin.zspuhui.com';
// console.log(BASE_URL, process.env, "BASE_URL", process.env.URI_API_BASEURL)
export default {
    // MOCK_AUTH_ADMIN: MOCK_AUTH + '/admin', // 管理员权限接口
    // MOCK_AUTH_VISITOR: MOCK_AUTH + '/visitor', // 访问权限接口
    // github授权
    GIT_OAUTH: 'https://github.com/login/oauth',
    // github用户
    GIT_USER: 'https://api.github.com/user',
    
    // bbc top news
    NEWS_BBC: 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070',
    
    // 数据列表
    dataList: BASE_URL +'/zsph-bs-creditHelp/credit/product/list',
    //获取产品类型
    dataPtoduct_Type: BASE_URL + '/zsph-bs-creditHelp/credit/dict/list/product_type',
    // 保存产品列表
    saveProduct: BASE_URL + '/zsph-bs-creditHelp/credit/product/save',
    //
    // 删除一条 post
    deleteItem: 'https://easy-mock.com/mock/5ce3c32472866523895a3e21/react/deleteItem',
    // 搜索一条数据
    searchItem: 'https://easy-mock.com/mock/5ce3c32472866523895a3e21/react/searchItem',
    //用户登入
    login: function (loginname, password){
        return BASE_URL + '/credit/login/' + loginname+"/" + password
    },
    //用户信息列表
    UserDataList: function (pageNo, pageSize){
        // return BASE_URL + `/api/notify/pageLoanCustomer?pageNo=${pageNo}&pageSize=${pageSize}`
        return BASE_URL + `/zsph-bs-creditHelp/credit/customer/findPage/${pageNo}/${pageSize}/api-callback`
    }
}


