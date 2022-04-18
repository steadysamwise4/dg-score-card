import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SCORE, DELETE_ROUND, ADD_ROUND } from "../utils/mutations";
import { QUERY_ALL_COURSES, QUERY_ROUND } from "../utils/queries";
import ScoreModal from "../components/ScoreModal";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { organizeHoleData } from "../utils/data/organizeHoleData";
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

function ScorePage() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const { roundId: roundParam } = useParams();
  const [addScore, { error }] = useMutation(ADD_SCORE, {
    refetchQueries: [QUERY_ROUND],
  });
 
  const { loading, data } = useQuery(QUERY_ROUND, {
    variables: { id: roundParam  },
  });
  const round = data?.round || {};
  const dgcr_id = location.state.dgcr_id;
  console.log(round);
  
  const [totalScore, setTotalScore] = useState(0);
  const [holesArr, setHolesArr] = useState([]);
  const [holeNumber, setHoleNumber] = useState(1);
  const [index, setIndex] = useState(0);
  const [holePar, setHolePar] = useState(null);
  const [holeLength, setHoleLength] = useState('');
  const [stroke, setStroke] = useState(3);
  const [show, setShow] = useState(false);
  const [started, setStarted] = useState(false);
  const [inputError, setInputError] = useState('');
  const par = 3;
  const tag = 'birdy';

  
  
  const toggleModal = () => {
    setShow(!show);
   
  };

  const startRound = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/dgcr_api/hole/${dgcr_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        if (response.ok) {
            const data = await response.json();
            const holeData= organizeHoleData(data);
            console.log(holeData)

            try {
              setStarted(true);
              setHolesArr(holeData);
              setHolePar(holeData[index].par);
              setHoleLength(holeData[index].length)
              setIndex(index + 1);
             

            } catch (e) {
              console.log(e);
            }
        
   
         
  }else {
    console.log(response.statusText)
  }
  }
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
    if (stroke < 1) {
      setInputError('Please enter a valid response!');
      console.log('Please enter a valid response!');
      return
    } else {
      setInputError('');
    }
   
    try {
      const updatedRound = await addScore({
        variables: { roundId: roundParam, holeNumber, par, stroke, tag },
      });
      const newTotalScore = updatedRound.data.addScore.totalScore;
      setStroke(3);
      
      if (holeNumber === holesArr.length ) {
        navigate(`/profile`);
      } else {
        setHoleNumber(holeNumber + 1);
        setHolePar(holesArr[index].par);
        setHoleLength(holesArr[index].length);
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
          total += holesArr[i].par;
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
         <button id='addBtn' className='button' onClick={startRound}>
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
        holesArr={holesArr}
      />
      <div className='d-flex flex-column align-items-center'>
        <div className='card-heading text-center'>
          <h1 className='alt-heading'>Hole #{holeNumber}</h1>
          <h2 className='alt-sub-heading'>{location.state.courseName}</h2>
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
        <InputGroup className="mb-3" style={{ width: '350px'}}>
    <Button variant="outline-secondary" id="button-addon1" onClick={addStroke}>
    ➕
    </Button>
    <FormControl
      aria-label="Example text with button addon"
      aria-describedby="basic-addon1"
      value={stroke}
      className='text-center w-50 fs-1'
      onChange={(e) => setStroke(Number(e.target.value))}
      type='number'
      pattern='[0-9]*'
      id='strokeTotal'
      min={1}
      step='1'
    />
    <Button variant="outline-secondary" id="button-addon2" onClick={removeStroke}>
    ➖
    </Button>
  </InputGroup>
  {inputError && <div className='text-danger'>{inputError}</div>}
        
        <div>
          <button onClick={handleAddScore} className='button-go my-5'>
            {holeNumber === holesArr.length ? (
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
