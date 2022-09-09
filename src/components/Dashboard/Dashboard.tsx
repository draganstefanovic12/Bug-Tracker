import { Link } from "react-router-dom";
import menu from "../../assets/images/menu.svg";

export const Dashboard = () => {
  return (
    <div className="flex h-full w-44 bg-[#33475c] text-white pt-1 relative">
      <ul className="gap-2 flex flex-col pt-2 w-44">
        <img
          src={menu}
          className="h-6 absolute right-0 pr-1 hover:cursor-pointer sm:block md:hidden"
          alt="menu"
        />
        <Link
          to="/"
          className="before:content-[url('././assets/images/dashboard.svg')] dashboard-link"
        >
          Dashboard
        </Link>
        <Link
          to="/projects"
          className="before:content-[url('././assets/images/projects.svg')] dashboard-link"
        >
          Manage Projects
        </Link>
        <Link
          to="/tickets"
          className="before:content-[url('././assets/images/tickets.svg')] dashboard-link"
        >
          Manage Tickets
        </Link>
        <Link
          to="/roles"
          className="before:content-[url('././assets/images/users.svg')] dashboard-link"
        >
          Manage Roles
        </Link>
      </ul>
    </div>
  );
};
