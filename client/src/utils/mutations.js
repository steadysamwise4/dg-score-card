import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation createCourse(
    $courseName: String!
    $location: String!
    $holeCount: Int!
  ) {
    createCourse(
      courseName: $courseName
      location: $location
      holeCount: $holeCount
    ) {
      _id
      courseName
      location
      holeCount
      holes {
        holeNumber
        par
        length
      }
    }
  }
`;

export const ADD_HOLE = gql`
  mutation addHole($courseId: ID!, $holeNumber: Int!, $par: Int!, $length: String) {
    addHole(courseId: $courseId, holeNumber: $holeNumber, par: $par, length: $length) {
      _id
      holeCount
      holes {
        holeNumber
        par
        length
      }
    }
  }
`;

export const ADD_HOLES = gql`
  mutation addHole($courseId: ID!, $holesArr: Float!) {
    addHoles(courseId: $courseId, holesArr: $holesArr) {
      _id
      courseName
      holes {
        holeNumber
        par
        length
      }
    }
  }
`;

export const ADD_ROUND = gql`
mutation addRound($courseName: String!) {
  addRound(courseName: $courseName) {
    _id
    createAt
    username
    courseName
    scores {
      holeNumber
      par
      holeStroke
      tag
    }
    totalScore
  }
}
`;

export const DELETE_ROUND = gql`
  mutation deleteRound($roundId: ID!) {
    deleteRound(roundId: $roundId) {
      _id
      username
      createAt
      course {
        courseName
        holeCount
        parTotal
      }
    }
  }
`;

export const ADD_SCORE = gql`
  mutation addScore($roundId: ID!, $holeNumber: Int!, $par: Int!, $holeStroke: Int!, $tag: String!) {
    addScore(roundId: $roundId, holeNumber: $holeNumber, par: $par, holeStroke: $holeStroke, tag: $tag) {
      totalScore
      scores {
        holeNumber
        par
        holeStroke
        tag
      }
    }
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse($courseId: ID!) {
    addCourse(courseId: $courseId) {
      courses {
        _id
      }
    }
  }
`;


export const REMOVE_COURSE = gql`
  mutation removeCourse($courseId: ID!) {
    removeCourse(courseId: $courseId) {
      courses {
        _id
      }
    }
  }
`;
