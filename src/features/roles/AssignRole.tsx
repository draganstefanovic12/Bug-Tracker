import { User } from "../../types/types";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import axios from "../axios/interceptors";
import { useAppSelector } from "../../hooks/useRedux";

type AssignRoleProps = {
  user: User[] | undefined;
};

export const AssignRole = ({ user }: AssignRoleProps) => {
  const userRole = useAppSelector((user) => user.user?.role);
  const [role, setRole] = useState<string>("");
  const [assignUser, setAssignUser] = useState<string | string[]>();

  const handleAssign = async () => {
    if (!assignUser || !role) return;

    const options = {
      name: assignUser,
      role: role,
    };
    await axios.post(
      "https://drg-bug-tracker.herokuapp.com/users/role",
      options
    );
  };

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAssignUser(e.target.value);
  };

  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5 pl-5 w-2/4">
      <h1 className="font-bold">Assign a role to one or multiple users</h1>
      <select
        multiple
        className="w-3/6 h-52 overflow-auto"
        onChange={handleUser}
      >
        {user?.map((user: User, i) => (
          <option key={i} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <select
        disabled={userRole !== "admin" && true}
        className="w-3/6"
        onChange={handleRole}
      >
        <option className="text-center">
          {userRole === "admin"
            ? "--SELECT A ROLE--"
            : "Only administrators can change roles."}
        </option>
        <option value="admin">Admin</option>
        <option value="developer">Developer</option>
        <option value="user">User</option>
      </select>
      <Button
        className="flex items-center btn-form text-center flex-col"
        onClick={handleAssign}
      >
        Submit
      </Button>
    </div>
  );
};
