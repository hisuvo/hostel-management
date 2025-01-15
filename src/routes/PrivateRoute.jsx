import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Lodder from "../components/Lodder/Lodder";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Lodder />;
  }

  if (user) {
    return children;
  }
  return (
    <Navigate
      to={"/user/login"}
      state={{ from: location }}
      replace={true}
    ></Navigate>
  );
}

export default PrivateRoute;
