import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import userService from '../services/userService';
import { Redirect  } from 'react-router-dom';

class RegisterForm extends Form {
    state = { 
        data: { username: '', password: '', name: '', img: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label("Password"),
        img: Joi.string().label('Image'),
        name: Joi.string().required().label("Name")
    }

    doSubmit = async () => {
        try{
            const response = await userService.register(this.state.data)
            auth.loginWithJwt(response.headers['x-auth-token']);
            this.props.history.push('/jobs');
        }
        catch(ex){
            if(ex.response){
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors })
            }
        }
    }

    render() { 
        if(auth.getCurrentUser()) return <Redirect to='/jobs' />
            return (
            <div className="register-login">
                <div className="login-form-primary">
                    <h1>Register</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('username', "Username", 'text', "login-form-username login-form")}
                        {this.renderInput('password', "Password", 'password', "login-form-password login-form")}
                        {this.renderInput('name', "Name", 'text', 'login-form login-form-name')}
                        <label htmlFor="image">Image</label>
                        {this.renderUploadImg()}
                        {this.renderButton('Register', "login-button register-button mb-5")}
                    </form>
                </div>
            </div>
        );
    }
}


export default RegisterForm