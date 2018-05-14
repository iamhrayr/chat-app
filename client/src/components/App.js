import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { Container } from 'semantic-ui-react';
import history from '../helpers/history';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import ConversationsPage from './Pages/Conversations';
import ConversationPage from './Pages/Conversation';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Container>
                    <Route path="/" exact component={ConversationsPage} />
                    <Route path="/chat/:id" component={ConversationPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                </Container>
            </Router>
        );
    }
}

export default App;
