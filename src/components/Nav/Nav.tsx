import { Notifications } from "../../features/user/Notifications";
import { useAppSelector } from "../../hooks/useRedux";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

export const Nav = () => {
  const user = useAppSelector((user) => user.user)!;

  return (
    <nav className="flex justify-between h-9 z-10 bg-[#fff] drop-shadow">
      <h1 className="items-center w-44 after:content-whitebug bg-[#313648] text-[#fff] after:pt-2 pl-1 after:flex flex">
        Bug Tracker
      </h1>
      <div className="flex text-sm pr-2">
        <Notifications />
        <DropdownMenu />
      </div>
    </nav>
  );
};
