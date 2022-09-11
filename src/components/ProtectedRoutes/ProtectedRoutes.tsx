import { useAppSelector } from "../../hooks/useRedux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const user = useAppSelector((user) => user.user?.username);

  return user ? <Outlet /> : <Navigate to="/login" />;
};
