import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';
// 引入Provider
import { Provider } from 'react-redux';
import { dealFn, store } from './store';
import PrivateRoute from "./components/PrivateRoute"
import Data from "./components/datas/datas"
let DealLogin = dealFn(Login);
let DealPrivateRoute = dealFn(PrivateRoute)
let DealApp = dealFn(App)
export default class Page extends Component {
    render() {
        let {username}  = this.props.state
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/login" component={DealLogin} />
                        <Route path="/404" component={NotFound} />
                        <DealPrivateRoute path="/app" component={DealApp} />
                        <DealPrivateRoute exact path="/" component={DealLogin} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}


// <Route exact path="/" render={() => <Redirect to="/login" push />} />
//     <Route path="/app" component={App} />
//     <Route path="/404" component={NotFound} />
//     <Route path="/login" component={DealLogin} />
//     <Route component={NotFound} />