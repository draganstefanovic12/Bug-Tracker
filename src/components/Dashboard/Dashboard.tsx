import { Link } from "react-router-dom";
import { useState } from "react";
import menu from "../../assets/images/menu.svg";

export const Dashboard = () => {
  const [display, setDisplay] = useState("");

  const handleMobileDashboard = () => {
    setDisplay(
      display === "animate-fadein" ? "animate-fadeout" : "animate-fadein"
    );
  };

  const handleCloseOnClick = () => {
    setDisplay("sm:animate-fadeout");
  };

  return (
    <div
      className={`${display} flex md:animate-none h-full z-10 bg-[#212121] text-white pt-1 sm:w-8 md:w-44`}
    >
      <ul className="gap-2 flex flex-col pt-2 overflow-hidden sm:w-8 md:w-44">
        <img
          onClick={handleMobileDashboard}
          src={menu}
          className="h-7 w-7 ml-0.5 hover:cursor-pointer sm:flex md:hidden"
          alt="menu"
        />
        <Link
          to="/"
          onClick={handleCloseOnClick}
          className="before:content-[url('././assets/images/dashboard.svg')] dashboard-link"
        >
          Dashboard
        </Link>
        <Link
          to="/projects"
          onClick={handleCloseOnClick}
          className="before:content-[url('././assets/images/projects.svg')] dashboard-link"
        >
          Manage Projects
        </Link>
        <Link
          to="/tickets"
          onClick={handleCloseOnClick}
          className="before:content-[url('././assets/images/tickets.svg')] dashboard-link"
        >
          Manage Tickets
        </Link>
        <Link
          to="/roles"
          onClick={handleCloseOnClick}
          className="before:content-[url('././assets/images/users.svg')] dashboard-link"
        >
          Manage Roles
        </Link>
      </ul>
    </div>
  );
};
