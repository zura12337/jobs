import React from 'react';

const Input = ({ name, label, error ,className ,...rest }) => {
    const classes = className + ' form-control'
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                {...rest}
                name={name}
                id={name} 
                className={classes}
            />
            {error && <div className="error mt-1">{error}</div>}
        </div>
    );
}
 
export default Input;
