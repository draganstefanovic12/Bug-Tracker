import { useState } from "react";
import { Input } from "../../components/Input/Input";
import { User } from "../../types/types";

type PersonnelProps = {
  assignedUsers: User[] | undefined;
};

export const AssignedPersonnel = ({ assignedUsers }: PersonnelProps) => {
  const [assigned, setAssigned] = useState<User[] | undefined>(assignedUsers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setAssigned(assignedUsers);
      return;
    }
    const filter = assigned?.filter(
      (user) =>
        user.username.includes(e.target.value) ||
        user.email.includes(e.target.value) ||
        user.role.includes(e.target.value)
    );
    setAssigned(filter);
  };

  return (
    <ul>
      <p>Assigned personnel: </p>
      <div className="flex">
        <p className="w-28">Name</p>
        <p className="w-72">Email</p>
        <p className="w-28">Role</p>
      </div>
      <Input onChange={handleSearch} />
      {assigned &&
        assigned!.map((user: User, i: number) => (
          <li className="flex" key={i}>
            <p className="w-28">{user.username}</p>
            <p className="w-72">{user.email}</p>
            <p className="w-40">{user.role}</p>
          </li>
        ))}
    </ul>
  );
};
