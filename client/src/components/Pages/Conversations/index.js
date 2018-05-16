import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, List, Container } from 'semantic-ui-react';
import { fetchConversations } from '../../../actions/chat';

class Conversations extends Component {
    componentDidMount() {
        this.props.fetchConversations();
    }

    renderConversations = () => {
        return this.props.conversations.data.map(conv => {
            console.log(conv);
            return (
                <List.Item key={conv.conversation}>
                    <Image avatar src="https://bootdey.com/img/Content/avatar/avatar4.png" />
                    <List.Content>
                        <List.Header as={Link} to={`/chat/${conv.conversation}`}>{`${conv.oponent.firstName} ${
                            conv.oponent.lastName
                        }`}</List.Header>
                        <List.Description>{conv.body}</List.Description>
                    </List.Content>
                </List.Item>
            );
        });
    };

    render() {
        if (this.props.conversations.isFetched) {
            return (
                <Container text style={{ marginTop: 20 }}>
                    <List relaxed>{this.renderConversations()}</List>
                </Container>
            );
        }

        // return laoding if the data is not fetched
        return (
            <Container text style={{ marginTop: 20 }}>
                <span>Loading.....</span>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        conversations: state.conversations
    };
}
export default connect(mapStateToProps, { fetchConversations })(Conversations);
