import React from "react";

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  if (!loggedIn) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
