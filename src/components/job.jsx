import React, { Component } from 'react';
class Job extends Component {
    

    
    render() {
        let badge_new;
        let badge_featured;
        let language;
        let tool;
        let job_classes = "job row";
        if (this.props.job.new){
            badge_new = <h5 className="badge new">New!</h5>
        }else{
            badge_new = ''
        }
        if (this.props.job.featured){
            badge_featured = <h5 className="badge featured">Featured</h5>
            job_classes = "job row job-featured"
        }else{
            badge_featured = ''
        }
        if(this.props.job.languages){
            language = this.props.job.languages.map(language => <p className="badge-main" onClick={this.props.onClick} key={language}>{language}</p>)
        }
        if(this.props.job.tools){
            tool = this.props.job.tools.map(tool => <p key={tool} onClick={this.props.onClick} className="badge-main">{tool}</p>)
        }
        return ( 
            <React.Fragment>
                <div className={job_classes}>
                    <div className="col-1">
                        <img src={this.props.job.logo} alt="logo" id="logo" />
                    </div>
                    <div className="job-main col-6">
                        <div className="job-upper">
                            <p className="company">{this.props.job.company}</p>
                            <div className="badges-1">
                                {badge_new}
                                {badge_featured}
                            </div>
                        </div>
                        <div className="job-mid">
                            <h3 className="position">{this.props.job.position}</h3>
                        </div>
                        <div className="job-bot">
                            <p className="common">{this.props.job.postedAt}</p>
                            <p className="point">•</p>
                            <p className="common">{this.props.job.contract}</p>
                            <p className="point">•</p>
                            <p className="common">{this.props.job.location}</p>
                        </div>
                    </div>
                    <div className="badges col-4">
                        {language}
                        {tool}
                    </div>
                </div>
            </React.Fragment>
        );            
    }
}
 
export default Job;
