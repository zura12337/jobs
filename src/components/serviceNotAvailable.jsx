import React from 'react';

const ServiceNotAvailable = (props) => {
    const handleClick = () => {
        props.history.goBack();

    }
    return (
        <div className="col text-center">
            <h1 className="error-text">Service not Available yet</h1>
            <button className="btn btn-primary text-center" onClick={handleClick}>Go Back</button>
        </div>
    );
}
 
export default ServiceNotAvailable;