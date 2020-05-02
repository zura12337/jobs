import React from 'react';
import { NavLink } from 'react-router-dom';


 
const NavBar = ({ user }) => {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link active" to="/jobs">Jobs <span className="sr-only">(current)</span></NavLink>
        {!user && (
        <React.Fragment>
          <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
        </React.Fragment>
        )}
        {user && (
        <React.Fragment>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {user.name}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <NavLink className="nav-item nav-link" to="/user">Profile</NavLink>
              <NavLink className="nav-item nav-link" to="/edit">Edit Profile</NavLink>
              <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
            </div>
          </div>
        </React.Fragment>
        )}

      </div>
    </div>
  </nav>

    );
}

export default NavBar;