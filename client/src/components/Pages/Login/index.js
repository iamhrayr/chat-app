import React, { Component } from 'react';
import { Container, Input, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { login } from '../../../actions/auth';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    handleInputChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = () => {
        this.props.login({
            email: this.state.email,
            password: this.state.password
        });
    };

    render() {
        return (
            <Container text className="mt-1">
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Field>
                        <label>Email</label>
                        <Input
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </Form.Field>
                    <Button primary>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default connect(null, { login })(Login);
