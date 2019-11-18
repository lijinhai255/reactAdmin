/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import Datas from "../components/datas/datas"
import Dashboard from './dashboard/Dashboard';
import SuperDetali from "../components/datas/dataDetail"
const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    Datas, Dashboard, WysiwygBundle, SuperDetali
}