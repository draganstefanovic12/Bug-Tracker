import { User } from "../types/types";
import { useFetch } from "../hooks/useFetch";
import { Categories } from "../components/Categories/Categories";
import { useEffect, useState } from "react";
import { AssignRole } from "../features/roles/AssignRole";

export const Roles = () => {
  const [user, setUser] = useState<User[]>();

  //Role assignment
  const users = useFetch("api/users/all");

  useEffect(() => {
    setUser(users);
  }, [users]);

  return (
    <div className="flex m-1">
      <AssignRole user={user} />
      <div>
        <h1 className="font-bold">All users</h1>
        <Categories
          children={["Name", "Email", "Role"]}
          className=" gap-40 child:w-20"
        />
        {user?.map((user: User, i) => (
          <div
            key={i}
            className="flex child:w-20 gap-40 child:text-sm bg-[#fff] relative"
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
