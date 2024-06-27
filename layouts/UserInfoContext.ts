import React from "react";

const UserInfoContext = React.createContext({
  id: 0,
  firstName: "",
  lastName: "",
  bio: "",
  job: "",
  linkedInId: "",
  HackerOneHandle: "",
  BugCrowdHandle: "",
});

export default UserInfoContext;
