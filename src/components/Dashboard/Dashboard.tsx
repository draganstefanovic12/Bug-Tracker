import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="flex h-full w-44 bg-[#2c3e50] text-white pl-1 pt-1 drop-shadow">
      <ul className="gap-2 flex flex-col pt-2">
        <Link
          to="/"
          className="before:content-[url('././assets/images/dashboard.svg')] flex gap-1"
        >
          Dashboard
        </Link>
        <Link
          to="/projects"
          className="before:content-[url('././assets/images/projects.svg')] flex gap-1"
        >
          Manage Projects
        </Link>
        <Link
          to="/tickets"
          className="before:content-[url('././assets/images/tickets.svg')] flex gap-1"
        >
          Manage Tickets
        </Link>
        <Link
          to="/roles"
          className="before:content-[url('././assets/images/users.svg')] flex gap-1"
        >
          Manage Roles
        </Link>
      </ul>
    </div>
  );
};
