import React, { Component } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getJobs } from './services/jobService'; 
import LoginForm from './components/loginForm';
import JobsTable from './components/jobsTable';
import NavBar from './components/navBar';
import Profile from './components/profile';
import Logout from './components/logout';
import Job from './components/getJob';
import RegisterForm from './components/registerForm';
import EditProfile from './components/editProfile';
import createNewJob from './components/createNewJob';
import UploadImgTest from './components/UploadImgTest';
import ServiceNotAvailable from './components/serviceNotAvailable';
import NotFound from './components/NotFound';
import auth from './services/authService';
import dotenv from 'dotenv'

dotenv.config()

class App extends Component {
  state = { 
    data: []
   }

   async componentDidMount() {
     const { data } = await getJobs();
     this.setState({data})
     const user = await auth.getUser();
     this.setState({user});
   }
  
  render() { 
    const { data, user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user}/>
        <div className="bg"></div>
        <ToastContainer />
        <div className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/jobs" render={props => <JobsTable {...props} data={data} user={user}/>} />
            <Route path="/user" component={Profile} />
            <Route path="/logout" component={Logout} />
            <Route path="/edit" component={EditProfile} />
            <Route path="/service-not-available" component={ServiceNotAvailable} />
            <Route path="/create-new-job" component={createNewJob} />
            <Route path="/not-found" component={NotFound}/>
            <Route path="/test" component={UploadImgTest} />
            <Route path="/:id" component={Job}/>
            <Redirect from="/" exact to="/jobs" />
            <Redirect to="/not-found"/>
          </Switch>
        </div> 
      </React.Fragment>
    );
  }
}
 
export default App;

