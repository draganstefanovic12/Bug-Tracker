import { User } from "../../types/types";
import { Input } from "../Input/Input";
import { useState } from "react";

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
    <ul className="w-2/5 relative">
      <div className="flex justify-between">
        <h1 className="font-bold">Assigned personnel: </h1>
        <Input
          className="bg-gray-100 absolute px-1 top-0 right-0.5 text-sm"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
      <div className="flex text-sm">
        <p className="w-24 font-bold">Name</p>
        <p className="w-72 font-bold">Email</p>
        <p className="w-28 font-bold">Role</p>
      </div>
      {assigned &&
        assigned!.map((user: User, i: number) => (
          <li className="flex text-sm" key={i}>
            <p className="w-24 text-gray-700">{user.username}</p>
            <p className="w-72 text-gray-700">{user.email}</p>
            <p className="w-28 text-gray-700">{user.role}</p>
          </li>
        ))}
    </ul>
  );
};
