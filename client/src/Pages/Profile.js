import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { QUERY_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

function Profile() {
  const { loading, data } = useQuery(QUERY_ME, {
  });
  const user = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }
  return (
    <section className='d-flex justify-content-center'>
      <div className=' flex-column'>
        <h1 className='text-center'>Welcome {user.username}!</h1>
        <button className='button-next my-4' as={NavLink} to={'/'}>Find a New Course</button>
        <div>
          <h2 className='text-center'>or</h2>
          <h2 className='text-center'>stick with a favorite</h2>
          <ul className='list-group list-group-flush text-center'>
            {courses.map((course, i) => (
              <button
                className='favCourse-link list-group-item fs-5 my-2 fw-bold'
                as={Link}
                to={'/'}
                datatype={course._id}
                key={i}
              >
                <FontAwesomeIcon icon={faStar} className='' />
                {course.courseName}
                <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
              </button>
            ))}
              <Link to={`/newround/${user.courses[0]._id}`}>
            <button className='favCourse-link list-group-item fs-2 my-2' as={NavLink} to={'/'}>
            {user.courses[0].courseName}
              <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
            </button>
            </Link>
            <button className='favCourse-link list-group-item fs-2 my-2' as={NavLink} to={'/'}>
              Course Name
              <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
            </button>
            <button className='favCourse-link list-group-item fs-2 my-2' as={NavLink} to={'/'}>
              Course Name
              <FontAwesomeIcon icon={faUpRightFromSquare} className='ps-2' />
            </button>
          </ul>
        </div>
        <div>
          <h3
            className='history-btn text-center my-5'
            onClick={() => toggleModal()}
          >
            View my History
          </h3>
        </div>
      </div>
    </section>
  );
}

export default Profile;