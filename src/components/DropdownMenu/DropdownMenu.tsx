import Button from "../Button";
import { useUser } from "../../context/UserContext";
import { useRef, useState } from "react";
import ClickAwayListener from "../ClickAwayListener";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, dispatch } = useUser();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={divRef}
      onClick={handleToggle}
      className="flex flex-col bg-[#fff] hover:bg-slate-50 hover:cursor-pointer child:h-3.5 pr-10 w-16"
    >
      <p className="font-bold">{user.username}</p>
      <p>{user.role}</p>
      <ClickAwayListener isOpen={isOpen} setIsOpen={setIsOpen} divRef={divRef}>
        <div className="flex flex-col child:bg-[#fff] bg-[#fff] absolute top-9">
          <Button
            onClick={handleLogout}
            className="rounded-b w-16 hover:bg-slate-100"
          >
            Logout
          </Button>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default DropdownMenu;
