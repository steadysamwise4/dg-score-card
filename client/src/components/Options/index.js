import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Options() {
    const handleLogOut = (e) => {
        e.preventDefault()
        Auth.logout();
    }

    return (
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-center">
          <Nav >
            <Nav.Link as={ Link } to="/" key='home' >
              Home
            </Nav.Link>
            <Nav.Link as={ Link } to="/history" key='history'>
              History
              </Nav.Link>
              <Nav.Link as={ Link } to="/profile" key='profile'>
                  Profile
              </Nav.Link>
              {Auth.loggedIn() && (
              <Nav.Link  key='logout' onClick={handleLogOut}>
                  Logout
              </Nav.Link>
              )}
          </Nav>
      
      </Navbar>
    );
}

export default Options;