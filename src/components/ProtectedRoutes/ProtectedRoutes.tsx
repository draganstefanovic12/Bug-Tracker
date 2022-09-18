import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoutes = () => {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
