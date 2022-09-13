import { User } from "../../types/types";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import axios from "../axios/interceptors";

type AssignRoleProps = {
  user: User[];
};

export const AssignRole = ({ user }: AssignRoleProps) => {
  const [role, setRole] = useState<string>("");
  const [assignUser, setAssignUser] = useState<string | string[]>();

  const handleAssign = async () => {
    if (!assignUser || !role) return;

    const options = {
      name: assignUser,
      role: role,
    };
    await axios.post("api/users/role", options);
  };

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAssignUser(e.target.value);
  };

  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 items-center w-2/4">
      <h1>Assign a role to one or multiple users</h1>
      <select multiple className="w-2/6" onChange={handleUser}>
        {user?.map((user: User, i) => (
          <option key={i} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <select className="w-2/6" onChange={handleRole}>
        <option className="text-center">--SELECT A ROLE--</option>
        <option value="admin">Admin</option>
        <option value="developer">Developer</option>
        <option value="user">User</option>
      </select>
      <Button className="flex btn-form align-middle" onClick={handleAssign}>
        Submit
      </Button>
    </div>
  );
};
