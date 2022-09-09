import { logout } from "../../features/user/userSlice";
import { Button } from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

export const Nav = () => {
  const user = useAppSelector((user) => user.user);
  console.log(user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex justify-between px-6">
      {user && (
        <h1>
          Logged in as: {user.username} ({user.role})
        </h1>
      )}
      {user && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
};
