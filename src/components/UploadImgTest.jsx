import React, { Component } from 'react';


class UploadImgTest extends Component {
    state = {
        image: '',
    }

    onChange = (e) => {
        e.preventDefault()
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload=(e)=>{
            console.warn('img data', e.target.result)
            this.setState({image: e.target.result});
        }
    }

    render() { 
        return (
            <form className="svp" enctype="multipart/form-data">
                    <div className="custom-file mb-4 mt-5">
                        <input type='file' name="img" id="validatedCustomFile"  onChange={this.onChange}  />
                        <button onClick={this.onSubmit} id="customFile" className="btn btn-primary btn-block mt-2">Submit</button>
                    </div>
                    {this.state.image ? (
                        <div className='mt-1'>
                            <img id="uploaded-img" src={this.state.image} alt='' />
                        </div>
                    ) : null}
            </form>
        );
    }
}
 
export default UploadImgTest;