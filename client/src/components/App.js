import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import history from '../helpers/history';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <React.Fragment>
                    {/* <Route path="/" component={LoginPage} /> */}
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
