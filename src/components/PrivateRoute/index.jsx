import React, { Component } from 'react'
import { Route, Redirect, } from 'react-router-dom'
import { Storage, isApp } from "../../tools"
import { message } from 'antd'
// import Store from '../../store/index'
// console.log(Store,"ljh-1234")
{/* <PrivateRoute exact path="/authentication" component={Authentication} /> */ }

// 从本地存储中 
const users = Storage.getItem("loginUser") && JSON.parse(Storage.getItem("loginUser"))
const isLogin = true
class PrivateRoute extends Component {
    render() {
        let { component: Component, state, ...rest } = this.props
        return (
            <Route {...rest} render={(props) => (
                // <Component {...props} />
                users || state.status === 0 ? <Component {...props}></Component>: <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location },
                        search: props.location.pathname + props.location.search
                    }}
                    />
            )}
            />
        )
    }
}

export default PrivateRoute 