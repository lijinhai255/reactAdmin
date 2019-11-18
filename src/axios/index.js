
import axios from 'axios';
import Http, { get, post } from './tools';
import config from './config';

export const getBbcNews = () => get({ url: config.NEWS_BBC });

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

// {headers: {Accept: 'application/json'}}
export const gitOauthInfo = access_token => get({ url: `${config.GIT_USER}access_token=${access_token}` });

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({ url: config.MOCK_AUTH_ADMIN });
// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });

export default {
    getListData: (obj) => Http.get(config.dataList, obj),// 获取产品列表
    getProductType: () => Http.get(config.dataPtoduct_Type),// 获取产品类型
    savrProcuct: (data) => Http.post(config.saveProduct,data),// 保存产品
    deleteItem: key => Http.post(config.deleteItem, { key }),
    searchItem: key => Http.post(config.searchItem, key),
    getUserData: (pageNo, pageSize) => Http.get(config.UserDataList(pageNo, pageSize))
}

// 用户登陆
export const gitOauthLogin = (username, password) => post({ url: config.login(username, password) }, { username, password });

// export const gitOauthLogin = () => get({ url: `${config.GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin` });

