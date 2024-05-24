import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);
  return <Outlet />;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
