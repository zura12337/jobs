import React, { Component } from 'react';
import { saveJob } from '../services/jobService';
import { getLanguages, getTools } from '../services/languageAndtools';
import Joi from 'joi-browser';
import Countries from 'countries-api';
import auth from '../services/authService';
import axios from 'axios';


class createNewJob extends Component {
    state = {
        languages: [],
        tools: [],
        countries: [],
        data: { 
            position: null,
            logo: null, 
            company: null,
            role: null, 
            contract: null, 
            level: null, 
            toolsId: [], 
            languagesId: [], 
            location: null, 
        },
        imageUrl: null,
        errors: {}      
    }

    schema = {
        position: Joi.string().required().label("Position"),
        logo: Joi.any().required().label("Company Logo"),
        company: Joi.string().required().label("Company"),
        role: Joi.string().required().label("Role"),
        contract: Joi.string().required().label("Contract"),
        level: Joi.string().required().label("Level"),
        location: Joi.string().required().label("Country"),
        languagesId: Joi.array().label("Languages"),
        toolsId: Joi.array().label("Tools"),
    }

    async componentDidMount() {
        const { data: tools } = await getTools();
        const { data: languages } = await getLanguages();
        const { data: countries } = Countries.findAll();
        this.setState({ tools, languages, countries });
    }



    onChangeFile = event => {
        let data = this.state.data;
        data['logo'] = event.target.files[0];
        this.setState({ data })
    }
    handleSelectLanguage = (e) => {
        const language = e.target.innerText;
        let data = this.state.data;
        const languageId = this.state.languages.find(lan => lan.name === language);
        if(!data['languagesId'].includes(languageId._id)){
            data['languagesId'] = data.languagesId.concat(languageId._id);
        }else{
            data['languagesId'] = data.languagesId.filter(l => languageId._id !== l);
        }
        console.log(this.state.data.languagesId);
        this.setState({ data });
    }

    validate = () => {
        const options = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, options);
        if (!result.error) return null; 
        const errors = {};
            for (let item of result.error.details) errors[item.path[0]] = item.message; //in details array, there are 2 properties,path and message.path is the name of the input, message is the error message for that input.
        return errors;
    };
    
    onValueChange = (e) => {
        const data = {...this.state.data};
        const errors = {...this.state.data};
        
        data[e.target.name] = e.target.value;
        const error = this.validate();
        this.setState({errors: error});
        this.setState({data});
    }

    
    handleSelectTool = (e) => {
        const tool = e.target.innerText;
        let data = this.state.data;
        const toolId = this.state.tools.find(to => to.name === tool);
        if(!data['toolsId'].includes(toolId._id)){
            data['toolsId'] = data.toolsId.concat(toolId._id);
        }else{
            data['toolsId'] = data.toolsId.filter(l => toolId._id !== l._id);
        }
        this.setState({ data });
    }

    handleChange = (e) => {
        const data = { ...this.state.data };
        data["location"] = e.target.value;
        this.setState({ data })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        console.log(errors);
        console.log(this.state.data);
        if (errors) return;

        const formData = new FormData();
        formData.append('file', this.state.data.logo);

        try{
            const res = await axios.post('https://static-job-listing-api.herokuapp.com/api/jobs/upload', formData, { 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
             });
            const { fileName, filePath } = res.data;
            const data = {...this.state.data};
            data['logo'] = filePath;
            this.setState({data});
            this.setState({ errors: { img: '' } });
        }
        catch(err){
            if(err.response.status === 500) {
                console.log('There was a problem with the server')
            }else{
                console.log(err.response.data);
                this.setState({ errors: { img: 'Image Not uploaded.' } })
            }
        }

        this.Submit()
    }
    Submit = async () => {
        try{
            const data = await saveJob(this.state.data);
            console.log(data);
        }
        catch(ex){
            if(ex.response){
                console.log(ex.response);
            }
        }
    }

    render() { 
        const { errors, data } = this.state;
        if(auth.getCurrentUser()){
            return(
            <div className="container new-job mt-5 mb-5">
                <form onSubmit={this.handleSubmit}>
                    <label className="col-form-label">Position</label>
                    <input type="text" onChange={this.onValueChange} name="position" className="form-control" />
                    {errors.position && <div className="error mt-1">{errors.position}</div>}
                        <label className="col-form-label">Company Logo</label>
                    <form onSubmit={this.handleSubmit} class="custom-file mt-1">
                        <input type="file" class="custom-file-input" onChange={this.onChangeFile} name="logo" id="validatedCustomFile" required />
                        <label class="custom-file-label" for="validatedCustomFile">{data.logo && data.logo.name}</label>
                        {errors.logo && <div className="error mt-1">{errors.logo}</div>}
                    </form>
                    <label className="col-form-label mt-4">Company</label>
                    <input type="text" onChange={this.onValueChange} name="company" className="form-control"/> 
                    {errors.company && <div className="error mt-1">{errors.company}</div>}
                    <label className="col-form-label">Role</label>
                    <input type="text" onChange={this.onValueChange} name="role" className="form-control" />
                    {errors.role && <div className="error mt-1">{errors.role}</div>}
                    <label className="col-form-label">Contract</label>
                    <input type="text" onChange={this.onValueChange} name="contract" className="form-control" />
                    {errors.contract && <div className="error mt-1">{errors.contract}</div>}
                    <label className="col-form-label">Level</label>
                    <input type="text" onChange={this.onValueChange} name="level" className="form-control" />
                    {errors.level && <div className="error mt-1">{errors.level}</div>}
                    <select onChange={this.handleChange}class="custom-select mt-3">
                        <option selected disabled>Select Country</option>
                        <option>Global</option>
                        {this.state.countries.map(country => (
                            <option value={country.name.official}>{country.name.official}</option>
                        ))}
                    </select>

                    <label className="col-form-label mt-4">Languages</label>
                        {this.state.languages.map( language => (    
                        <div class="custom-control custom-checkbox ml-3">
                                <input type="checkbox" className="custom-control-input" id={this.state.languages.indexOf(language)}/>
                                <label class="custom-control-label" onClick={this.handleSelectLanguage} for={this.state.languages.indexOf(language)}>{language.name}</label>
                        </div>
                        ))}
                    <label className="col-form-label mt-4">Tools</label>
                        {this.state.tools.map( tool => 
                        (    
                        <div class="custom-control custom-checkbox ml-3">
                                <input type="checkbox" className="custom-control-input" id={this.state.tools.indexOf(tool) + 100}/>
                                <label class="custom-control-label" onClick={this.handleSelectTool} for={this.state.tools.indexOf(tool) + 100}>{tool.name}</label>
                        </div>
                        ))}

                    <input type="submit" className="btn btn-primary btn-block mt-3"/>
                </form>
            </div>
         );
        }else{
            window.location = '/not-found';
        }
    }
}
 
export default createNewJob;