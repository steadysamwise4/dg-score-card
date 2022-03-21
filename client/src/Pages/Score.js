import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SCORE, DELETE_ROUND } from "../utils/mutations";
import { QUERY_ALL_COURSES, QUERY_ROUND } from "../utils/queries";
import ScoreModal from "../components/ScoreModal";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function ScorePage() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const { roundId: roundParam } = useParams();
  const [addScore, { error }] = useMutation(ADD_SCORE, {
    refetchQueries: [QUERY_ROUND],
  });
  const { loading, data } = useQuery(QUERY_ROUND, {
    variables: { id: roundParam },
  });
  const round = data?.round || {};
  
  console.log(round);
  
  
  const [totalScore, setTotalScore] = useState(0);
  const [holeNumber, setHoleNumber] = useState(1);
  const [index, setIndex] = useState(0);
  const [holePar, setHolePar] = useState(null);
  const [holeLength, setHoleLength] = useState('');
  const [stroke, setStroke] = useState(3);
  const [show, setShow] = useState(false);
  const [started, setStarted] = useState(false);

  console.log(round);
  
  const toggleModal = () => {
    setShow(!show);
   
  };

  const startRound = () => {
    setStarted(true);
    setHolePar(round.course[0].holes[index].par);
    setHoleLength(round.course[0].holes[index].length)
    setIndex(index + 1);
  };

  const addStroke = () => {
    let score = document.getElementById("strokeTotal").value;
    let newScore = ++score;
    return setStroke(newScore);
  };

  const removeStroke = () => {
    let score = document.getElementById("strokeTotal").value;
    if (score <= 1) {
      score = 1;
      return;
    }
    let newScore = --score;
    return setStroke(newScore);
  };
  const handleAddScore =  async (event) => {
    event.preventDefault();
   
    try {
      const updatedRound = await addScore({
        variables: { roundId: roundParam, holeNumber, stroke },
      });
      const newTotalScore = updatedRound.data.addScore.totalScore;
      setStroke(3);
      
      if (holeNumber === round.course[0].holeCount) {
        navigate(`/profile`);
      } else {
        setHoleNumber(holeNumber + 1);
        setHolePar(round.course[0].holes[index].par);
        setHoleLength(round.course[0].holes[index].length);
        setTotalScore(newTotalScore);
        setIndex(index + 1);
       
      }
    } catch (e) {
      console.error(e);
    }
  };
  // const FindPar = (cntCourseName, i) => {
  //   const holeNum = i;
  //   for (let i = 0; i < courses.length; i++) {
  //     const course = courses[i];
  //     if (cntCourseName === course.courseName) {
  //       // console.log(course);
  //       const holePar = course.holes[holeNum].par;
  //       return holePar;
  //     }
  //   }
  // };
  const FindParTotal = (holeNum) => {
        let total = 0;
        for (let i = 1;i<holeNum; i++) {
          total += round.course[0].holes[i].par;
        }
        return total;
  };

  const findScore = (par) => {
    let score = totalScore - par;
    if (score > 0) {
      return `+${score}`;
    } else if (score < 0) {
      return `${score}`;
    } else {
      return 'Even';
    }
  };

  const [deleteRound, { err }] = useMutation(DELETE_ROUND);

  const handleDeleteRound = (event) => {
    event.preventDefault();
    try {
      deleteRound({
        variables: { roundId: roundParam },
      });

      navigate(`/profile`);
    } catch (err) {
      console.error(err);
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

  if (!started) {
    return (
      <div className='d-flex justify-content-center'>
         <button id='addBtn' className='button w-50' onClick={startRound}>
          Begin Round
        </button>
      </div>
    );
  }
  return (
    <main>
      <ScoreModal
        show={show}
        handleClose={toggleModal}
        round={round}
        FindParTotal={FindParTotal}
      />
      <div className='d-flex flex-column align-items-center'>
        <div className='card-heading text-center'>
          <h1 className='alt-heading'>Hole #{holeNumber}</h1>
          <h2 className='alt-sub-heading'>{round.course[0].courseName}</h2>
          <h2 className='alt-sub-heading'>Par: {holePar}</h2>
          <h2 className='alt-sub-heading'>Length: {holeLength} ft</h2>

          <h3 className='alt-sub-heading'>
            Score:{" "}
            {findScore(FindParTotal(holeNumber))}
          </h3>
        </div>
        <button className='button-go btn-lg my-3' onClick={() => toggleModal()}>
          View Score Card
        </button>
        <button id='addBtn' className='button w-50' onClick={addStroke}>
          <FontAwesomeIcon icon={faPlus} className='fs-1' />
        </button>
        <div className='d-flex justify-content-center my-1'>
          <input
            type='number'
            pattern='[0-9]*'
            id='strokeTotal'
            min={1}
            step='1'
            className='text-center w-50 fs-1 mt-3'
            value={stroke}
            onChange={(e) => setStroke(e.target.value)}
          />
        </div>
        <button id='subtractBtn' className='button w-50' onClick={removeStroke}>
          <FontAwesomeIcon icon={faMinus} className='fs-1' />
        </button>
        <div>
          <button onClick={handleAddScore} className='button-go my-5'>
            {holeNumber === round.course[0].holeCount ? (
              <p>Finish</p>
            ) : (
              <p>Next Hole</p>
            )}
          </button>
        </div>

        <button id='button-delete' onClick={handleDeleteRound}>
          <FontAwesomeIcon
            icon={faTrash}
            className='fatrash'
            size='2x'
            style={{ color: "red" }}
          />
        </button>
        {error && <div>Something went wrong...</div>}
        {err && <div>Something went wrong...</div>}
      </div>
    </main>
  );
}

export default ScorePage;
