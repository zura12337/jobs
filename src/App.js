import React, { Component } from 'react';
import './App.css';
import Job from './components/job';
import data from './components/data/data.json';
import SearchBar from './components/searchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = { 
    selected: [],
    data: data
   }
  handleClick = (option) => {
  if(this.state.selected.includes(option.target.innerText)){
    toast.error('Cannot add same item 2 times.')
  }else if(this.state.selected.length >= 5){
    toast.error('Cannot add more than 5 items.')
  }else{
    this.setState({
      selected: this.state.selected.concat([option.target.innerText])
    })


    //////////////// VESRSION 1 ////////////////////
    // const data = (this.state.data.map(selected => (
    //   selected.languages ? console.log(selected.languages.filter(selected.languages == target.innerText)) : ''
    // )))
    /////////////// VERSION 2 ///////////////////

    // let data = this.state.data.filter(selected => selected.languages ? selected.languages.includes(option.target.innerText): false)
    
    ///////////// VERSION 3 //////////////////
    let data = this.state.data.filter(selected => selected.toolsAndLanguages.includes(option.target.innerText))
    this.setState({data})
   } 
  }
  handleDelete = (item) => {
    const originalSelected = [...this.state.selected];
    const selected = originalSelected.filter(i => i !== item);
    this.setState({selected});
    this.setState({data});
  }
  handleClear = () => {
    const selected = [];
    this.setState({selected});
    this.setState({data});
  }
  
  render() { 
    
    return (
      <React.Fragment>
        <ToastContainer />
        <SearchBar items={this.state.selected} onDelete={this.handleDelete} onClear={this.handleClear}/>
        {this.state.data.map(job => (
          <Job job={job} key={job.id} onClick={this.handleClick}/>
        ))}
      </React.Fragment>
    );
  }
}
 
export default App;

