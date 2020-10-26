import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from '../../store/actions'
import { Button, TextField, Container, CircularProgress } from '@material-ui/core';
import Logo from '../../assets/images/swvl.png'
import classes from './Login.css'
import { bindActionCreators } from 'redux';

class Login extends Component {

    state = {
        username: '',
        password: '',
        error: false
    }
    handleUserNameChange = event => {
        const { value } = event.target
        this.setState({
            username: value
        })
    }
    handlePasswordChange = event => {
        const { value } = event.target
        this.setState({
            password: value
        })
    }

    login = event => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        const loginStatus = !this.props.loading ?
            <Button onClick={event => this.login(event)}
                style={{
                    width: '30%', 
                    backgroundColor: '#162729', 
                    color: 'white'
                }}
                type="submit" variant="contained" >
                Login
            </Button> :
            <CircularProgress style={{
                color: '#162729',
                width: '30px',
                height: '30px'
            }} />
        return (
            <Container className={classes.Login} component="div" maxWidth="xs">
                <div className={classes.Container}>
                    <img style={{ width: '100px', height: '40px', margin: '7%' }} src={Logo} alt="swvl logo" />
                    <span className={classes.Title}>
                        Welcome, Login!
                    </span>
                    <form className={classes.Form}>
                        <TextField
                            variant="outlined"
                            error={this.props.error}
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            type="email"
                            onChange={event => this.handleUserNameChange(event)}
                            label="Email Address"
                            placeholder="username@swvl.com"
                            // InputProps={{
                            //     endAdornment:
                            //         <InputAdornment position="end">
                            //             <span style={{ fontSize: '17px', opacity: '0.6' }}>@swvl.com</span>
                            //         </InputAdornment>,
                            // }}
                        />
                        <TextField
                            variant="outlined"
                            error={this.props.error}
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            name="password"
                            label="Password"
                            onChange={event => this.handlePasswordChange(event)}
                            placeholder="A strong one ;)"
                        />
                        
                        {this.props.error ? <span className={classes.Error}>{this.props.errorMsg}</span> : null}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            marginTop: '3%',
                            textAlign: 'center'
                        }}>
                            {loginStatus}
                        </div>
                    </form>
                </div>
            </Container>

        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        errorMsg: state.auth.errorMessage
    };
}
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);