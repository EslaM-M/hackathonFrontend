import React, { Component } from 'react';
import { Login } from '../../pages'
import Aux from '../../hoc/Aux'

class Auth extends Component {

    render() {
        return (
            <Aux>
                <Login />
            </Aux>
        )
    }
}

export default Auth;
