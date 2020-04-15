import React, { Component } from 'react';
import data from './data/data.json';

class Job extends Component {
    render() { 
        return ( 
            data.map(job => (
                <h1>{job.company}</h1>
            ))
        );            
    }
}
 
export default Job;
