import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
class Job extends Component {
    render() {
        let badge_new;
        let badge_featured;
        let language;
        let tool;
        if (this.props.job.new){
            badge_new = <h5 className="badge new">New!</h5>
        }else{
            badge_new = ''
        }
        if (this.props.job.featured){
            badge_featured = <h5 className="badge featured">Featured</h5>
        }else{
            badge_featured = ''
        }
        if(this.props.job.languagesId){
            language = this.props.job.languagesId.map(language => <p className="badge-main" onClick={this.props.onClick} key={language.name}>{language.name}</p>)
        }
        if(this.props.job.toolsId){
            tool = this.props.job.toolsId.map(tool => <p key={tool.name} onClick={this.props.onClick} className="badge-main">{tool.name}</p>)
        }
        return ( 
            <React.Fragment>
                <div  className="job">
                        <NavLink to={`/${this.props.job._id}`} className="col-1">
                            <img src={this.props.job.logo} alt="logo" id="logo" />
                        </NavLink>
                        <div className="job-main col-6">
                            <div className="job-upper">
                                <p className="company">{this.props.job.company}</p>
                                <div className="badges-1">
                                    {badge_new}
                                    {badge_featured}
                                </div>
                            </div>
                            <NavLink to={`/${this.props.job._id}`} className="job-mid">
                                <h3 className="position">{this.props.job.position}</h3>
                            </NavLink>
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
