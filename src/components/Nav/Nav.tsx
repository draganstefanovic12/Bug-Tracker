import { Notifications } from "../../features/user/Notifications";
import { useAppSelector } from "../../hooks/useRedux";

export const Nav = () => {
  const user = useAppSelector((user) => user.user)!;

  return (
    <nav className="flex justify-between h-9 z-10 bg-[#fff] drop-shadow">
      <h1 className="items-center w-44 after:content-whitebug bg-[#313648] text-[#fff] after:pt-2 pl-1 after:flex flex">
        Bug Tracker
      </h1>
      <div className="items-center flex text-sm">
        <Notifications />
        <div className="flex flex-col child:h-3">
          <p>{user.username}</p>
          <p>{user.role}</p>
        </div>
      </div>
    </nav>
  );
};
