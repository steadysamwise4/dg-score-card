import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom";

function Options() {
    return (
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-center">
          <Nav >
            <Nav.Link as={ Link } to="/" key='home' >
              Home
            </Nav.Link>
            <Nav.Link as={ Link } to="/profile" key='history'>
              History
              </Nav.Link>
              <Nav.Link as={ Link } to="/" key='profile'>
                  Profile
              </Nav.Link>
          </Nav>
      
      </Navbar>
    );
}

export default Options;