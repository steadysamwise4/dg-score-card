import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Home = (props) => {
  return (
    <section>
      <div className='d-flex justify-content-center'>
        <h2 className='heading m-2'>The Easy Way to Track Scores! 🥏</h2>
      </div>
      {!Auth.loggedIn() && (
        <div className='d-flex justify-content-center p-4'>
          <p className='sub-heading'>
            {" "}
            Login or Sign up to use our DiscGolf ScoreKeeper App
          </p>
        </div>
      )}
      {!Auth.loggedIn() && (
        <div className='d-flex justify-content-center'>
          <Link to='/login' style={{ textDecoration: "none" }}>
            <button className='button-go d-flex justify-content-center mb-3'>
              Login
            </button>
          </Link>
        </div>
      )}
      {!Auth.loggedIn() && (
        <div className='d-flex justify-content-center'>
          <Link to='/signup' style={{ textDecoration: "none" }}>
            <button
              type='button'
              className='button-go d-flex justify-content-center mb-3'
            >
              Sign up
            </button>
          </Link>
        </div>
      )}
      <div className='d-flex justify-content-center'>
        {/* <Link to='/viewcourses' style={{ textDecoration: "none" }}>
          <button
            type='button'
            className='button-go d-flex justify-content-center m-4'
          >
            View our Courses
          </button>
        </Link> */}
        <Link to='/searchcourses' style={{ textDecoration: "none" }}>
          <button
            type='button'
            className='button-go d-flex justify-content-center m-4'
          >
            Find Your Course
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
