import React, { useState } from "react";
import {
    MDBCard,
    MDBCardHeader,
    MDBListGroup,
    MDBListGroupItem,
  } from "mdb-react-ui-kit";
  import { useNavigate } from "react-router-dom";

const SearchCourses = () => {
    const [zip, setZip] = useState(0);
    const [searchedCourses, setSearchedCourses] = useState([]);

    const handleChange = (event) => {
        const { value }  = event.target;
        console.log(value);

        setZip(value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:3001/weather`, {
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
      
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <input value={zip} onChange={handleChange}></input>
          <button>Submit</button>
        </form>
        <MDBCard style={{ width: "18rem" }} className='course-list'>
        <MDBCardHeader className='text-center'>Courses near {zip}</MDBCardHeader>
        {searchedCourses[0] === "Bad Request" ? (<h6 style={{color: "red"}}>No Courses Found</h6>) : (
        <MDBListGroup flush>
            {searchedCourses &&
              searchedCourses.map((course) => (
                <MDBListGroupItem
                  key={course.course_id}
                  className='list d-flex justify-content-between'
                >
                  {" "}
                 <h6 className="searched_course_link" >{course.name}</h6>
                 <div>
                 {course.city}, {course.state} - {course.holes} holes - Rating: <img alt="rating" src={course.rating_img_small} />

                 </div>
                </MDBListGroupItem>
              ))}
          </MDBListGroup>
          )}
        </MDBCard>

      </div>
    );

}

export default SearchCourses;