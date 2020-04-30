import React, { Component } from 'react';
import auth from '../services/authService';
import {NavLink} from 'react-router-dom';

class Profile extends Component {
    state = { 
        user: {},
        loading: false,
     }
    async componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({user});
        this.setState({ loading: false });
    }
    refreshPage = () => {
        window.location.reload(true);
    }
    render() { 
        const { loading } = this.state;
    
        if(loading) { 
            return null;
        }
        return ( 
            <div className="container mt-5">
                <div className="img-div">
                 <img src={this.state.user.img} id="profile-img" alt="profile" />
                </div>
                <h1 className="sec-text sm m-4">Name: {this.state.user.name}</h1>
                <h1 className="sec-text sm m-4">Email: {this.state.user.email}</h1>
                <NavLink to="/edit" className="btn btn-primary ml-4">Edit Profile</NavLink>
            </div>
         );
    }
}
 
export default Profile;