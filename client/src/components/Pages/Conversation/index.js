import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, TextArea } from 'semantic-ui-react';
import { fetchConversation } from '../../../actions/chat';

class Conversation extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchConversation(id);
    }
    renderMessages = () => {
        return this.props.conversation.data.map(msg => {
            console.log(msg);
            return (
                <div key={msg._id} style={{ marginBottom: 15 }}>
                    <strong>{msg.author.firstName + ' ' + msg.author.lastName}</strong>
                    <p>{msg.body}</p>
                </div>
            );
        });
    };
    render() {
        if (this.props.conversation.isFetched) {
            return (
                <Container text>
                    <TextArea />
                    {this.renderMessages()}
                </Container>
            );
        }

        // show loader if data is not fetched
        return (
            <Container text>
                <span>Loading...</span>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        conversation: state.conversation
    };
}
export default connect(mapStateToProps, { fetchConversation })(Conversation);
