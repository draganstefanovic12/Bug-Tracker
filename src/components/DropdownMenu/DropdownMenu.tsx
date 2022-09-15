import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { logout } from "../../features/user/userSlice";
import { useRef, useState } from "react";
import { ClickAwayListener } from "../ClickAwayListener/ClickAwayListener";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useAppSelector((user) => user.user)!;
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={divRef}
      onClick={handleToggle}
      className="flex flex-col bg-[#fff] hover:cursor-pointer child:h-3.5 pl-2"
    >
      <p className="font-bold">{user.username}</p>
      <p>{user.role}</p>
      <ClickAwayListener isOpen={isOpen} setIsOpen={setIsOpen} divRef={divRef}>
        <div className="flex flex-col py-2 child:bg-[#fff] bg-[#fff] absolute top-9">
          <Link to="/settings" className="border-b-2">
            Settings
          </Link>
          <Button onClick={handleLogout} className="rounded-b">
            Logout
          </Button>
        </div>
      </ClickAwayListener>
    </div>
  );
};
