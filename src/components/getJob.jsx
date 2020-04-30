import React, { Component } from 'react';
import auth from '../services/authService';
import { getJob } from '../services/jobService';
import NotFound from './NotFound';

class Job extends Component {
    state = { 
        data: {},
        objectid: false,
        loading: true
     }
     async componentDidMount() {
         const user = auth.getCurrentUser();
         this.setState({user});
         let {pathname} = this.props.location;
         pathname = pathname.slice(1);

         if (pathname.match(/^[0-9a-fA-F]{24}$/)) {
            const { data } = await getJob(pathname);
            this.setState({data});
            this.setState({objectid: true})
        } else {
            this.setState({objectid: false});
        }
        this.setState({ loading: false });
    }
    handleClick = () => {
        this.props.history.replace('/jobs');
    }
    render() { 
        const { loading } = this.state;
    
        if(loading) { 
            return null;
        }
        return ( 
            this.state.objectid === true ? (
                <div className="m-4">
                    <div className="job-table">
                        <img src={this.state.data.logo} alt="logo" className="m-2" id="get-job-img"/>
                        <h1 className="primary-text m-2">{this.state.data.company}</h1>
                        <p className="sec-text m-2">Position: {this.state.data.position}</p>
                        <p className="sec-text m-2">Role: {this.state.data.role}</p>
                        <p className="sec-text m-2">Contract: {this.state.data.contract}</p>
                        <p className="sec-text m-2 row languages-and-tools">Languages And Tools:{this.state.data.toolsAndLanguages && (
                        this.state.data.toolsAndLanguages.map(language => (
                                <p className="badge-main m-2" id="page-badges" onClick={this.handleClick}>{language}</p>
                        )))} </p>
                    </div>
                </div>
            ) : window.location = '/not-found'
        
            
         );
    }
}
 
export default Job;