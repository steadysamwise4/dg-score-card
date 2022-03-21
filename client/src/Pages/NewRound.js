import React, { useState } from "react";
import { QUERY_COURSE } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ROUND } from "../utils/mutations";
import { useParams, useNavigate, Link } from "react-router-dom";

const NewRound = () => {
  const navigate = useNavigate();
  const { courseId: courseParam } = useParams();

  const [holePar, setHolePar] = useState(null);
  const [holeLength, setHoleLength] = useState('');


  const { loading, data } = useQuery(QUERY_COURSE, {
    variables: { _id: courseParam },
  });
  const course = data?.course || {};
  const courseId = course._id;

  const [addRound, { error }] = useMutation(ADD_ROUND);

  const handleStartRound = async () => {
    try {
      const round = await addRound({
        variables: { course: courseId },
      });
      const roundId = round.data.addRound._id;
      const courseToPlay = round.data.addRound.course;
      setHolePar(courseToPlay[0].holes[0].par);
      setHoleLength(courseToPlay[0].holes[0].length);
        
        navigate(`/score/${roundId}`, { state: {holePar: holePar, holeLength: holeLength} });

    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className='d-flex justify-content-center'>
        <h1 className='alt-heading animate__animated  animate__bounce'>
          Loading...
        </h1>
      </div>
    );
  }
  if (!course?.courseName) {
    return (
      <h4 className='heading'>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <section className='m-5'>
      <div className='heading d-flex flex-column align-items-center'>
        <h5>Play a round at {course.courseName} ?</h5>

        <button onClick={handleStartRound} className='button-go'>
          Let's Go!
        </button>
        {error && <div>Go back and login or signup</div>}

        <Link to='/viewcourses' style={{ textDecoration: "none" }}>
          <div className='d-flex justify-content-center'>
            <button type='button' className='button-go justify-content-center'>
              Go Back
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default NewRound;
