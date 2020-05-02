import React, { Component, Fragment } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends Component {
    state = {
        data: { },
        errors: { },
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
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors })
        console.log(this.state.data);
    }
    onChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload=(e)=>{
            const data = {...this.state.data};
            data['image'] = e.target.result;
            this.setState({ data });
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
                    <div className="custom-file  mt-5">
                        <input type='file' name="img"  id="validatedCustomFile" onChange={this.onChange}  />
                    </div>
                    {this.state.image ? (
                        <div className='mt-3'>
                            <img id="uploaded-img" src={this.state.image} alt='' />
                        </div>
                    ) : null}
                    {this.state.errors.img && <div className="error mt-1">{this.state.errors.img}</div>}
            </Fragment>
        )
    }
    
}
 
export default Form;
