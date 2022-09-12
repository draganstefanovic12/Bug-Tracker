import { logout } from "../../features/user/userSlice";
import { Button } from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

export const Nav = () => {
  const user = useAppSelector((user) => user.user)!;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="flex justify-between px-1 h-9 bg-[#fff] drop-shadow">
      <h1 className="flex items-center select-none">
        Logged in as: {user.username} ({user.role})
      </h1>
    </nav>
  );
};
