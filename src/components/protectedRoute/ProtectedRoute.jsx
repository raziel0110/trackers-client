import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";


const ProtectedRoute = () => {
  const location = useLocation()
  const {authState} = useAuth();
  return authState.authenticated ? <Outlet /> :  <Navigate to="/login" location={location} replace/>
}

export default ProtectedRoute;