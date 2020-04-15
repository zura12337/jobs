import React, { Component } from 'react';

class Job extends Component {
    render() { 
        return ( 
            <h1>{this.props.jobId}</h1>
        );            
    }
}
 
export default Job;
