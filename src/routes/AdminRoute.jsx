import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import Lodder from "../components/Lodder/Lodder";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, adminLoading] = useAdmin();
  const location = useLocation();

  if (loading || adminLoading) {
    return <Lodder />;
  }

  if (user && isAdmin) {
    return children;
  }

  return (
    <Navigate
      to={"/login"}
      state={{ from: location }}
      replace={true}
    ></Navigate>
  );
};

export default AdminRoute;
