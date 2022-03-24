import { gql } from "@apollo/client";

//for a specific user's courses
export const QUERY_COURSES = gql`
  query courses($username: String) {
    courses(username: $username) {
      _id
      courseName
      location
      holes {
        holeNumber
        par
      }
    }
  }
`;

//for all courses
export const QUERY_ALL_COURSES = gql`
  query allCourses {
    courses {
      _id
      courseName
      location
      holeCount
      holes {
        _id
        holeNumber
        par
        length
      }
    }
  }
`;
//to get a single course by ID
export const QUERY_COURSE = gql`
  query course($_id: ID!) {
    course(_id: $_id) {
      _id
      courseName
      location
      holeCount
      holes {
        holeNumber
        par
      }
    }
  }
`;

export const QUERY_ROUND = gql`
query round($id: ID!) {
  round(_id: $id) {
    _id
    createAt
    username
    courseName
    scores {
      holeNumber
      stroke
    }
    totalScore
  }
}
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      courses {
        _id
        courseName
        location
        holeCount
        holes {
          _id
          holeNumber
          par
        }
      }
      rounds {
        courseName
        createAt
        username
        scores {
          holeNumber
          stroke
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    email
    courses {
      _id
      courseName
      location
      holes {
        holeNumber
        par
        length
      }
      holeCount
      parTotal
    }
    rounds {
      _id
      createAt
      username
      courseName
      scores {
        holeNumber
        stroke
      }
      totalScore
    }
    coursesPlayed
  }
}
`;

export const QUERY_ME_COURSES = gql`
  {
    me {
      courses {
        _id
        courseName
        location
      }
    }
  }
`;