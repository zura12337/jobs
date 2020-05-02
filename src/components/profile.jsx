import React, { Component, Fragment } from 'react';
import auth from '../services/authService';
import {NavLink} from 'react-router-dom';
import ReactLoading from 'react-loading';

class Profile extends Component {
    state = { 
        user: {},
        loading: true,
     }
    async componentDidMount() {
        const user = await auth.getUser();
        console.log(user);
        this.setState({user});
        this.setState({ loading: false });
    }
    render() { 
        const { loading } = this.state;
    
        
        return ( 
            <div className="container mt-5">
                {this.state.loading ? (
                    <div className="loading-bars">
                        <ReactLoading type={"bars"} color={"black"} />
                    </div>
                ) : (
                    <Fragment>
                        <div className="img-div">
                         <img src={this.state.user.image} id="profile-img" alt="profile" />
                        </div>
                        <h1 className="sec-text sm m-4">Name: {this.state.user.name}</h1>
                        <h1 className="sec-text sm m-4">Email: {this.state.user.email}</h1>
                        <NavLink to="/edit" className="btn btn-primary ml-4">Edit Profile</NavLink>
                        <NavLink to="/logout" className="btn btn-danger ml-4">Logout</NavLink>
                    </Fragment>
                )}
            </div>
         );
    }
}
 
export default Profile;