// 引入createStore
import { createStore, applyMiddleware } from 'redux';
// 引入connect
import { connect } from 'react-redux';
// 异步action
import reduxThunk from 'redux-thunk';
// 引入reducer
import reducer from '../reducer';

// 创建store
// export let store = createStore(reducer);
// 拓展新的createStore方法
// let newCreateStore = applyMiddleware(reduxThunk)(createStore);
// // 创建store
// export let store = newCreateStore(reducer);
// 合并成一句话
export let store = applyMiddleware(reduxThunk)(createStore)(reducer);

// 拓展方法
// function mapStateToProps(state) {
// 	return { state }
// }
let mapStateToProps = state => ({ state })
let mapDispatchToProps = dispatch => ({ dispatch })
// 高阶方法
export let dealFn = connect(mapStateToProps, mapDispatchToProps);