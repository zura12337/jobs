import React, { Component } from 'react';
import Job from './job';
import SearchBar from './searchBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from './pagination';
import { NavLink } from 'react-router-dom';

class JobsTable extends Component {
    state = { 
        selected: [],
        currentPage: 1,
        postsPerPage: 2,
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
          let data = this.props.data.filter(selected => selected.toolsAndLanguages.includes(option.target.innerText))
          this.setState({data})
        } 
    }
    handleDelete = async (item) => {
      const originalSelected = [...this.state.selected];
      const selected = originalSelected.filter(i => i !== item);
      this.setState({selected});
    }
    handleClear = async () => {
      const { data } = this.props.data;
      const selected = [];
      this.setState({selected});
      this.setState({data});
    }

    paginate = (pageNumber) => {
      this.setState({ currentPage: pageNumber})
    }
    render() { 
      const { currentPage, postsPerPage } = this.state;
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = this.props.data.slice(indexOfFirstPost, indexOfLastPost);
        return ( 
        <div className="container">
            <SearchBar items={this.state.selected} onDelete={this.handleDelete} onClear={this.handleClear}/>
            {this.props.user && (
              <NavLink to="/create-new-job" className="btn btn-primary mt-5 create-new-job-button">Create New Job</NavLink>
            )}
            {currentPosts.map(job => (
            <Job job={job} key={job.id} onClick={this.handleClick}/>
            ))}
            <Pagination 
              postsPerPage={postsPerPage} 
              totalPosts={this.props.data} 
              paginate={this.paginate} 
              currentPage={currentPage} 
            />
        </div> 
        );
    }
}
 
export default JobsTable;

