import { User } from "../types/types";
import { useQuery } from "react-query";
import { Categories } from "../components/Categories/Categories";
import { AssignRole } from "../features/roles/AssignRole";
import axios from "../features/axios/interceptors";

const useQueryRoles = () => {
  return useQuery(["roles"], async () => {
    const link = "https://drg-bug-tracker.herokuapp.com/users/all";
    const data = await axios.get(link);
    return data.data;
  });
};

export const Roles = () => {
  const { isLoading, data } = useQueryRoles();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="md:flex m-1">
      <AssignRole />
      <div className="bg-[#fff] border m-2 shadow p-2 rounded">
        <h1 className="font-bold pl-1">All users</h1>
        <Categories
          children={["Name", "Email", "Role"]}
          className="gap-40 child:w-20 p-1"
        />
        {data &&
          data.map((user: User, i: number) => (
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
