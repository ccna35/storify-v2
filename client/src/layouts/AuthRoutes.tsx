import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const AuthRoutes = () => {
  const { user } = useContext(UserContext);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoutes;
