import React from 'react';
import Auth from '../utils/auth';

const Profile = () => {
    return (
        <>
        <h1 className='text-center p-2 mb-4' style={{width: '350px', margin: '0 auto'}}>Account</h1>
        <div className='d-flex flex-column align-items-center' style={{width: '350px', margin: '0 auto'}}>
            <h5 className='border border-dark p-1' style={{width: '350px'}}>username</h5>
            <h5 className='border border-dark p-1' style={{width: '350px'}}>email address</h5>
            <h5 className='border border-dark p-1' style={{width: '350px'}}>edit password link</h5>
            <h5 className='border border-dark p-1' style={{width: '350px'}}>link to friends</h5>
            <h5 className='border border-dark p-1' style={{width: '350px'}}>link to history/stats</h5>
        </div>
        </>
    )
}

export default Profile;
