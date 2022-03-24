import React, { useState } from "react";
import {
    MDBCard,
    MDBCardHeader,
    MDBListGroup,
    MDBListGroupItem,
  } from "mdb-react-ui-kit";
  import Auth from "../utils/auth";
  import { Link } from "react-router-dom";
  import RoundConfirmModal from "../components/RoundConfirmModal";

const SearchCourses = () => {
    const [zip, setZip] = useState('');
    const [show, setShow] = useState(false);
    const [clickedCourseId, setClickedCourseId] = useState('');
    const [clickedCourseName, setClickedCourseName] = useState('');
    const [searchedCourses, setSearchedCourses] = useState([]);

   

    const handleChange = (event) => {
        const { value }  = event.target;
        console.log(value);

        setZip(value)
    }

    const toggleModal = () => {
      setShow(!show);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:3001/dgcr_api/zip/`, {
            method: 'POST',
            body: JSON.stringify({
                searchzip: zip
            }),
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        if (response.ok) {
            const data = await response.json();

            if (Object.keys(data)[0] === "0") {
                setSearchedCourses(data);
            } else {
                setSearchedCourses(["Bad Request"]);
            }
        } else {
            console.log(response.statusText);
        }
    }

    const handleCourseClick = (dgcr_id, name) => async (e) => {
      e.preventDefault();
      setClickedCourseId(dgcr_id);
      setClickedCourseName(name);
      toggleModal();
        
        
        // const response = await fetch(`http://localhost:3001/dgcr_api/hole/${dgcr_id}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json' 
        //     }
        // });
        // if (response.ok) {
        //     const data = await response.json();
        //     const holeData= organizeHoleData(data);

        //     const matchingCourse = mongoCourseData.find(
        //       (course) => course.courseName === data[0].name.trim()
        //     );
          
        //     if (!matchingCourse) { 

        //     try {
        //         // execute createCourse mutation and pass in variable data from form
        //         const newCourse = await createCourse({
        //           variables: {
        //             courseName: data[0].name,
        //             location: `${data[0].city}, ${data[0].state}`,
        //             holeCount: parseInt(holes),
        //           },
        //         });
        //         console.log(holeData);
        //         for (let i=0;i<holeData.length;i++) {
        //             const updatedCourse = await addHole({
        //                 variables: {
        //                   courseId: newCourse.data.createCourse._id,
        //                   holeNumber: holeData[i].holeNumber,
        //                   par: holeData[i].par,
        //                   length: holeData[i].length,
        //                 }
        //               });
        //               if (updatedCourse) {
        //                 continue;
        //               } else {
        //                 setTimeout(() => {
        //                   console.log('...loading')
        //                 }, 500)
        //               }
        //             }

        //         navigate(`/newround/${newCourse.data.createCourse._id}`);
        //       } catch (e) {
        //         console.error(e);
        //       }
        //     } else {
        //       navigate(`/newround/${matchingCourse._id}`);
        //     }
        
    }
    console.log(searchedCourses);

    // if (loading) {
    //     return (
    //       <div className='d-flex justify-content-center'>
    //         <h1 className='alt-heading animate__animated  animate__bounce'>
    //           Loading...
    //         </h1>
    //       </div>
    //     );
    //   }
      
    return (
      <div style={{ width: "350px", margin: "0 auto" }}>
        <RoundConfirmModal
        show={show}
        handleClose={toggleModal}
        name={clickedCourseName}
        dgcr_id={clickedCourseId}
      />
        <h3 className="card-heading d-flex justify-content-center">
          {`Enter zip`}

          <a href="https://www.dgcoursereview.com/">
            <img
              src={require("../assets/images/logo_100.png")}
              className="px-4 dgcr-link"
              alt="dgcr logo"
            />
          </a>
        </h3>
        <form
          className="d-flex flex-column justify-content-center "
          onSubmit={handleFormSubmit}
        >
          <input
            className="my-input"
            value={zip}
            onChange={handleChange}
          ></input>
          <button className="button-search">Submit</button>
          {!Auth.loggedIn() ? (
            <h3 className="sub-heading">
              Log in or Sign up to start scoring a round
            </h3>
          ) : (
            <></>
          )}
        </form>
        <MDBCard className="course-list" style={{ width: "350px" }}>
          <MDBCardHeader className="text-center text-medium">
            Courses near {zip}
          </MDBCardHeader>
          {searchedCourses[0] === "Bad Request" ? (
            <h6 style={{ color: "red" }}>No Courses Found</h6>
          ) : (
            <MDBListGroup flush>
              {searchedCourses &&
                searchedCourses.map((course) => (
                  <MDBListGroupItem
                    key={course.course_id}
                    className="list d-flex flex-column justify-content-between"
                  >
                    {" "}
                    {Auth.loggedIn() ? (
                      <h5
                        onClick={handleCourseClick(
                          course.course_id,
                          course.name
                        )}
                        className="searched_course_link"
                      >
                        {course.name}
                      </h5>
                    ) : (
                      <h5>{course.name}</h5>
                    )}
                    <div>
                      <div>
                        {course.city}, {course.state} - {course.holes} holes
                      </div>
                      <div>
                        Rating:{" "}
                        <img alt="rating" src={course.rating_img_small} />
                      </div>
                    </div>
                  </MDBListGroupItem>
                ))}
            </MDBListGroup>
          )}
        </MDBCard>
        <Link to='/' className='text-no-decoration'>
        <button type="button" className="button d-flex justify-content-center">
          Go Back
        </button>
        </Link>
      </div>
    );

}

export default SearchCourses;