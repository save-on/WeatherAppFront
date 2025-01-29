// import React from "react";

import { Navigate } from "react-router";

function ProtectedRoute({ children, loggedIn }) {
  if (!loggedIn) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
