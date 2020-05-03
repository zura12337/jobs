import React, { Component } from 'react';
import auth from '../services/authService';
import { getJob } from '../services/jobService';
import ReactLoading from 'react-loading';

class Job extends Component {
    state = { 
        data: {},
        loading: true
     }
     async componentDidMount() {
         const user = auth.getCurrentUser();
         this.setState({user});
         let {pathname} = this.props.location;
         pathname = pathname.slice(1);

        const jobId = this.props.match.params.id;
        if(jobId === 'new') return;
        const { data: job } = await getJob(jobId);
        this.setState({ data: this.mapToViewModel(job) })
        this.setState({ loading: false });
    }
    mapToViewModel(job){
        return {
            _id: job._id,
            company: job.company,
            role: job.role,
            contract: job.contract,
            level: job.level,
            logo: job.logo,
            position: job.position,
            toolsAndLanguages: job.toolsAndLanguages
        }
    }
    handleClick = () => {
        this.props.history.replace('/jobs');
    }
    render() { 
        const { loading, objectid } = this.state;
    
        
        return ( 
            loading ? (
                <div className="loading-bars">
                    <ReactLoading type={"bars"} color={"black"} />
                </div>
            ) : (
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
                    
            ))
                    }
}
 
export default Job;