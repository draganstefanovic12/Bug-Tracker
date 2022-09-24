import { User } from "../../types/types";
import Button from "../../components/Button";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { useDatabase } from "../../context/DatabaseContext";
import { useQueryClient, useMutation } from "react-query";
import axios from "../axios/interceptors";

export const AssignRole = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { users } = useDatabase();
  const [role, setRole] = useState<string>("");
  const [assignUser, setAssignUser] = useState<string | string[]>();

  const handleAssign = async () => {
    if (!assignUser || !role) return;

    const options = {
      name: assignUser,
      role: role,
    };
    await axios.post(`/users/role`, options);
  };

  const mutateRoles = useMutation(handleAssign, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAssignUser(e.target.value);
  };

  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5 mt-4 pl-5 w-2/4">
      <h1 className="font-bold ml-1">Assign a role to one or multiple users</h1>
      <select
        multiple
        disabled={user.username.slice(0, 4) === "demo" && true}
        className="w-3/6 h-52 border overflow-auto"
        onChange={handleUser}
      >
        {users?.map((user: User, i) => (
          <option key={i} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <select
        disabled={user.role !== "admin" && true}
        className="w-3/6 border"
        onChange={handleRole}
      >
        <option className="text-center">
          {user.role === "admin"
            ? "--SELECT A ROLE--"
            : "Only administrators can change roles."}
        </option>
        <option value="admin">Admin</option>
        <option value="developer">Developer</option>
        <option value="user">User</option>
      </select>
      <Button
        className="flex items-center btn-form text-center flex-col"
        onClick={() => mutateRoles.mutate()}
      >
        Submit
      </Button>
    </div>
  );
};
