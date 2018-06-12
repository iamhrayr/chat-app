import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, TextArea, Form, Button } from 'semantic-ui-react';
import { fetchConversation, sendMessage } from '../../../actions/chat';
import io from 'socket.io-client';

class Conversation extends Component {
    constructor(props) {
        super(props);
        this.socket = io('http://localhost:3001', {
            query: 'token=' + localStorage.token
        });
    }

    state = {
        message: ''
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchConversation(id);

        this.socket.on('message', data => {
            console.log(data);
        });

        this.socket.on('error', function(error) {
            if (error.type == 'UnauthorizedError' || error.code == 'invalid_token') {
                // redirect user to login page perhaps?
                console.log("User's token has expired");
            }
        });
    }

    renderMessages = () => {
        return this.props.conversation.data.map(msg => {
            return (
                <div key={msg._id} style={{ marginBottom: 15 }}>
                    <strong> {msg.author.firstName + ' ' + msg.author.lastName} </strong> <p> {msg.body} </p>{' '}
                </div>
            );
        });
    };

    handleSendMessage = () => {
        // this.props.sendMessage(this.state.message, this.props.match.params.id);
        this.socket.emit('message', {
            message: this.state.message,
            userId: this.props.match.params.id
        });
    };

    handleChangeMessage = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        if (this.props.conversation.isFetched) {
            return (
                <Container text style={{ marginTop: 10 }}>
                    <Form onSubmit={this.handleSendMessage} style={{ marginBottom: 30 }}>
                        <TextArea name="message" onChange={this.handleChangeMessage} value={this.state.message} />{' '}
                        <Button style={{ marginTop: 5 }}> Send </Button>{' '}
                    </Form>{' '}
                    {this.renderMessages()}{' '}
                </Container>
            );
        }

        // show loader if data is not fetched
        return (
            <Container text>
                <span> Loading... </span>{' '}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        conversation: state.conversation,
        userId: state.auth.user._id
    };
}
export default connect(
    mapStateToProps,
    {
        fetchConversation,
        sendMessage
    }
)(Conversation);
