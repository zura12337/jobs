import React from 'react';
import _ from 'lodash';

const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {
    const pagesCount = Math.ceil(totalPosts.length / postsPerPage);
    // for(let i = 1; i < Math.ceil(totalPosts.length / postsPerPage); i++){
    //     pageNumbers.push(i);
    // }
    if(pagesCount === 1) return null;
    const pageNumbers = _.range(1, pagesCount + 1);

    console.log(pageNumbers);

    return (
        <nav className="pagination mb-5">
            {pageNumbers.map(number => (
                <li key={number} className={ number === currentPage? 'page-item active' : 'page-item'}>
                    <a onClick={() => paginate(number)} href="#" current className="page-link">{number}</a>
                </li>
            ))}
        </nav>
    );
}
 
export default Pagination;