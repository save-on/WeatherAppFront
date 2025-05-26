import React from "react";

const CurrentUserContext = React.createContext({
  currentUser: null,
  loggedIn: false,
  setCurrentUser: () => {},
  setloggedIn: () => {},
});

export default CurrentUserContext;
