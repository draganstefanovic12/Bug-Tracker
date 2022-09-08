import { logout } from "../../features/user/userSlice";
import { Button } from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

export const Nav = () => {
  const user = useAppSelector((user) => user.user?.username);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex justify-between pl-6">
      {user && <h1>Logged in as: {user}</h1>}
      {user && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
};
