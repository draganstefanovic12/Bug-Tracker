import { Link } from "react-router-dom";
import { useState } from "react";
import menu from "../../assets/images/menu.svg";

const links = [
  { to: "/projects", img: "before:content-projects", name: "Manage Projects" },
  { to: "/tickets", img: "before:content-tickets", name: "Manage Tickets" },
  { to: "/roles", img: "before:content-users", name: "Manage Roles" },
];

const Dashboard = () => {
  //State for mobile dashboard animation
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
      className={`${display} flex md:animate-none h-full z-10 bg-[#252a34] shadow-lg text-[#fff] pt-1 sm:w-8 md:w-44`}
    >
      <ul className="gap-2 flex flex-col pt-2 overflow-hidden sm:w-8 md:w-44">
        <img
          onClick={handleMobileDashboard}
          src={menu}
          className="h-7 w-7 ml-0.5 hover:cursor-pointer sm:flex md:hidden"
          alt="menu"
        />
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.to}
            className={`${link.img} dashboard-link`}
            onClick={handleCloseOnClick}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
