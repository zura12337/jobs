import React, { Component } from 'react';
import auth from '../services/authService';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

class EditProfile extends Component {
    state = { 
        user: {},
        errors: {},
        newUser: {}
    }
    async componentDidMount() {
        const user = await auth.getCurrentUser();
        const username = user.name;
        const email = user.email;
        this.setState({user: { name: username, email }});
    }

    schema = {
        email: Joi.string().required().email().label('Email'),
        img: Joi.string().label('Image'),
        password: Joi.string().label('Password'),
        name: Joi.string().required().label("Name")
    }

    validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.user, this.schema, options)
        if(!error) return null;
        const errors = {};
        for(let i = 0; i < error.details.length; i++){
            errors[error.details[i].path[0]] = error.details[i].message;
        }
        console.log(errors);
        return errors
    }
    handleSubmit = e => {
        e.preventDefault()

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if(errors) return;

        this.doSubmit()
    }
    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const {error} = Joi.validate(obj,schema);
        return error ? error.details[0].message : null
    }
    doSubmit = async () => {
        try{
            console.log(this.state.user);
            await auth.editProfile(this.state.user);
            this.props.history.push('/jobs');
            window.location.reload();
        }
        catch(ex){
            if(ex.response && ex.response.status === 400){
                toast.error('Password Is Incorect');
            }
        }
    }
    

    onChange = e => {
        const errors = {...this.state.errors};

        let newValue = e.target.value;
        const user = {...this.state.user}
        user[e.target.name] = newValue;
        this.setState({ user, errors })
    }

    render() { 
        return (
            <div className="container mt-5">
                <form onSubmit={this.handleSubmit}>
                    <label className="mt-2" id="basic-addon1">Name</label>
                    <input className="form-control" type="text" name="name" onChange={this.onChange} value={this.state.user.name}/>
                    <label className="mt-2" id="basic-addon1">Email</label>
                    <input className="form-control" type="text" name="email" disabled value={this.state.user.email}/>
                    <button type="button" class="btn btn-primary mt-2" data-toggle="modal" data-target="#exampleModal">
                        Save
                    </button>
                    <div className="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Password Verification</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <label className="mt-2">Enter Your Password</label>
                                <input type="password" className="form-control" name="password" onChange={this.onChange} />
                            </div>
                            <div class="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            </div>
                        </div>
                        </div>
                </form>
            </div>
        );
    }
}
 
export default EditProfile;