const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    friends: [User]
    courses: [Course]
    rounds: [Round]
    coursesPlayed: [String]
    createdAt: String
  }
  type Course {
    _id: ID
    courseName: String
    location: String
    holes: [Hole]
    holeCount: Int
    parTotal: Int
  }
  type Hole {
    _id: ID!
    holeNumber: Int
    par: Int
    length: String
  }
  type Round {
    _id: ID
    createAt: String
    username: String
    courseName: String
    scores: [Score]
    totalScore: Int
  }
  type Score {
    _id: ID
    holeNumber: Int
    par: Int
    tag: String
    holeStroke: Int
  }
  type Query {
    me: User
    users: [User]
    user(username: String): User
    courses: [Course]
    course(_id: ID!): Course
    rounds: [Round]
    round(_id: ID!): Round
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addCourse(courseId: ID!): User
    removeCourse(courseId: ID!): User
    addRound(courseName: String!): Round
    deleteRound(roundId: ID!): Round
    deleteCourses: Course
    createCourse(
      courseName: String!
      location: String!
      holeCount: Int!
    ): Course
    addHole(courseId: ID!, holeNumber: Int!, par: Int!, length: String): Course
    addScore(roundId: ID!, holeNumber: Int!, par: Int!, holeStroke: Int!, tag: String!): Round
  }
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
