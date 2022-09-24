import axios from "../axios/interceptors";
import Button from "../../components/Button";
import { useState } from "react";
import { useDatabase } from "../../context/DatabaseContext";
import { Project, User } from "../../types/types";
import { useMutation, useQueryClient } from "react-query";

type AssignProps = {
  project: Project | undefined;
};

export const AssignUsersToProjects = ({ project }: AssignProps) => {
  const queryClient = useQueryClient();
  const { users } = useDatabase();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [user, setUser] = useState<string | string[]>();

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(e.target.value);
  };

  const handleSubmit = async () => {
    const options = {
      user: user,
      proj: project?.name,
    };
    await axios.post(`/users/assignProject`, options);
    setSubmitted(true);
  };

  const handleMutation = useMutation(handleSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });

  return (
    <div className="flex flex-col gap-5 w-2/4 absolute right-5 top-1 border bg-[#fff] shadow rounded">
      <h1 className="pl-1 font-bold">
        Assign this project to one or more personnel.
      </h1>
      <select
        multiple
        className="h-52 overflow-auto border"
        onChange={handleUser}
      >
        {users?.map((user: User, i) => (
          <option key={i} className="p-1" value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <Button
        className="flex items-center btn-form text-center mb-3 ml-2 flex-col"
        onClick={() => handleMutation.mutate()}
      >
        Submit
      </Button>
      {submitted && <p className="text-green-300">Success.</p>}
    </div>
  );
};
