import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Redirect, NavLink } from 'react-router-dom';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().required().  label('Username'),
        password: Joi.string().required().label("Password")
    };

    doSubmit = async () => {       
        try{
            const { username, password } = this.state.data;
            await auth.login(username, password);
            const { state } = this.props.location 
            window.location = state ? state.from.pathname : "/jobs";
        }
        catch(ex){
            if(ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors };
                errors.username = ex.response;
                this.setState({ errors })
            }
        }
    }


    render() {
        if(auth.getCurrentUser()) return <Redirect to='/user' />
            return (
            <div className="register-login">
                <div className="login-form-primary">
                    <h1 className="primary-text" id="login">Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('username', 'Username', 'text', "login-form-username login-form")}
                        {this.renderInput('password', 'Password', 'password', "login-form-password login-form")}
                        {this.renderButton("Login", "login-button register-button")}
                    </form>
                    <NavLink className="pass-reset" to="/service-not-available">Forgot Password?</NavLink>
                </div>
            </div> 
            );
    }
}

export default LoginForm