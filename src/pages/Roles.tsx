import { User } from "../types/types";
import { useFetch } from "../hooks/useFetch";
import { Categories } from "../components/Categories/Categories";
import { AssignRole } from "../features/roles/AssignRole";
import { useEffect, useState } from "react";

export const Roles = () => {
  const [user, setUser] = useState<User[]>();

  //Role assignment
  const users = useFetch("https://drg-bug-tracker.herokuapp.com/users/all");

  useEffect(() => {
    setUser(users);
  }, [users]);

  return (
    <div className="md:flex m-1">
      <AssignRole user={user} />
      <div>
        <h1 className="font-bold">All users</h1>
        <Categories
          children={["Name", "Email", "Role"]}
          className="gap-40 child:w-20 p-1"
        />
        {user?.map((user: User, i) => (
          <div
            key={i}
            className="flex child:w-20 gap-40 child:text-sm bg-[#fff] relative p-1 hover:bg-slate-100"
          >
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
