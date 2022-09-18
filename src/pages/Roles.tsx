import { User } from "../types/types";
import { AssignRole } from "../features/roles/AssignRole";
import Categories from "../components/Categories";
import { useDatabase } from "../context/DatabaseContext";

export const Roles = () => {
  const { users } = useDatabase();

  return (
    <div className="md:flex m-1">
      <AssignRole />
      <div className="bg-[#fff] border m-2 shadow p-2 rounded">
        <h1 className="font-bold pl-1">All users</h1>
        <Categories
          children={["Name", "Email", "Role"]}
          className="gap-40 child:w-20 p-1"
        />
        {users &&
          users.map((user: User, i: number) => (
            <div
              key={i}
              className="flex child:w-20 gap-40 child:text-sm bg-[#fff] relative p-1 border-b-2 hover:bg-slate-100"
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
