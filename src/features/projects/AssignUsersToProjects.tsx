import axios from "../axios/interceptors";
import { Button } from "../../components/Button/Button";
import { useFetch } from "../../hooks/useFetch";
import { Project, User } from "../../types/types";
import { useEffect, useState } from "react";

type AssignProps = {
  project: Project | undefined;
};

export const AssignUsersToProjects = ({ project }: AssignProps) => {
  const [users, setUsers] = useState<User[]>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [user, setUser] = useState<string | string[]>();

  const usrs: User[] | undefined = useFetch("api/users/all");

  useEffect(() => {
    setUsers(usrs);
  }, [usrs]);

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(e.target.value);
  };

  const handleSubmit = async () => {
    const options = {
      user: user,
      proj: project?.name,
    };
    await axios.post("api/users/assignProject", options);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-5 w-2/4">
      <h1>Assign this project to one or more personnel.</h1>
      <select multiple className="w-3/6 overflow-auto" onChange={handleUser}>
        {users?.map((user: User, i) => (
          <option key={i} className="p-1" value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <Button
        className="flex items-center btn-form text-center flex-col"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {submitted && <p className="text-green-300">Success.</p>}
    </div>
  );
};
