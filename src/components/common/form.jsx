import React, { Component, Fragment } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import axios from 'axios';

class Form extends Component {
    state = {
        data: { img: '' },
        errors: { img: '' },
        file: '',
        uploadedFile: {}
    };
    validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.data, this.schema, options)
        if(!error) return null;

        const errors = {};
        for( let item of error.details )
            errors[item.path[0]] = item.message
        return errors
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] }
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null
    
    }
    handleSubmit = e => {
        e.preventDefault()

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if(errors) return;

        this.doSubmit()
    }
    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors};
        console.log("HELLO WORLD")
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors })
    }
    onChange = (e) => {
        this.setState({file :e.target.files[0]});
        this.setState({filename: e.target.files[0].name})
    }

    onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        

        try{
            const res = await axios.post('http://localhost:3900/api/users/upload', formData, { 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
             });
            const { fileName, filePath } = res.data;
            const data = {...this.state.data};
            data['img'] = filePath;
            this.setState({data});
            this.setState({uploadedFile: { fileName, filePath }})
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
    }
    renderButton(label, className){
        const classN = className + ' btn btn-primary'
        return(
        <button
            type="submit"
            className={classN}
        >{label}</button>
        )
    } 
    renderInput(name, label, type = 'text', className) {
        const { data, errors } = this.state;

        return (
            <Input 
                type={type}
                onChange={this.handleChange} 
                name={name} 
                label={label} 
                value={data[name]} 
                error={errors[name]}
                className={className}
            />
            
        )
    }
    renderUploadImg = () => {
        return (
            <Fragment>
                <form className="svp" enctype="multipart/form-data">
                    <div className="custom-file mb-4">
                        <input type='file' name="img" className="custom-file-input" id="validatedCustomFile" required onChange={this.onChange}  />
                        <label className="custom-file-label" for="customFile">
                            {this.state.filename}
                        </label>
                        <button onClick={this.onSubmit} id="customFile" className="btn btn-primary btn-block mt-2">Submit</button>
                    </div>
                    {this.state.uploadedFile ? (
                        <div className='mt-1'>
                            <img id="uploaded-img" src={this.state.uploadedFile.filePath} alt='' />
                        </div>
                    ) : null}
                </form>
                    {this.state.errors.img && <div className="error mt-1">{this.state.errors.img}</div>}
            </Fragment>
        )
    }
    
}
 
export default Form;
