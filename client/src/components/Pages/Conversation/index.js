import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { fetchConversation } from '../../../actions/chat';

class Conversation extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchConversation(id);
    }
    renderMessages = () => {
        return this.props.conversation.data.map(msg => {
            return <div key={msg._id}>{msg.body}</div>;
        });
    };
    render() {
        if (this.props.conversation.isFetched) {
            return this.renderMessages();
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
