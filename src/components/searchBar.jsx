import React, { Component } from 'react';


class SearchBar extends Component {
    state = {  }

    render() { 
        let classes;
        if(this.props.items.length < 1) {
            classes = "none" 
        }else{
            classes = "searchBar"
        }
        return ( 
            <div className={classes}>
                {this.props.items.map(item => (
                    <div className="selected-item row" key={item}>
                        <h5 className="selected-text ">{item}</h5>
                        <button className="undo" onClick={() => this.props.onDelete(item)}><i className="fas fa-times"></i></button>
                    </div>
                ))}
                <button className="clear" onClick={this.props.onClear} >Clear</button>
            </div>
         );
    }
}
 
export default SearchBar;