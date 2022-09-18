import DropdownMenu from "../DropdownMenu";
import { Notifications } from "../../features/user/Notifications";

const Nav = () => {
  return (
    <nav className="flex justify-between h-9 z-10 bg-[#fff] pr-12 drop-shadow">
      <h1 className="items-center text-transparent md:text-white w-8 md:w-44 after:content-whitebug bg-[#313648] text-[#fff] after:pt-2 pl-1 after:flex flex">
        Bug Tracker
      </h1>
      <div className="flex text-sm gap-2 pr-2">
        <Notifications />
        <DropdownMenu />
      </div>
    </nav>
  );
};

export default Nav;
