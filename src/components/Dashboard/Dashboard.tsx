import { Link } from "react-router-dom";
import { useState } from "react";
import menu from "../../assets/images/menu.svg";

export const Dashboard = () => {
  const [display, setDisplay] = useState(false);

  const handleMobileDashboard = () => {
    setDisplay(!display);
  };

  return (
    <div
      className={
        display
          ? `flex h-full bg-[#33475c] text-white pt-1 w-44 animate-fadein`
          : `w-8 animate-fadeout flex h-full bg-[#33475c] text-white pt-1`
      }
    >
      <ul className="gap-2 flex flex-col pt-2 w-full">
        <img
          onClick={handleMobileDashboard}
          src={menu}
          className="h-7 w-7 ml-0.5 hover:cursor-pointer sm:flex md:hidden"
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
