import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {

  return (
    <section className="d-flex justify-content-center">
        <div className="form">
        <div>
          <h2 className="d-flex justify-content-center">Sign Up</h2>
            <div className="d-flex justify-content-center">
            <form className="col-12 col-md-3">
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
              />
              <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-primary d-flex justify-content-center" value="submit">
                Submit
              </button>
            </div>
            </form>
            </div>
            </div>
            </div>
    </section>
  );
};

export default Signup;
