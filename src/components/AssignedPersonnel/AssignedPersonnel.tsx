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
    <div>
      <h1 className="font-bold">Assigned personnel:</h1>
      <ul className="relative h-80 bg-[#fff] rounded p-2 shadow">
        <div className="flex justify-between">
          <Input
            className="bg-[#ededed] absolute px-1 top-1 shadow-inner right-2 text-sm"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
        <div className="flex text-sm border-b-2 border-black">
          <p className="w-32 font-bold">Name</p>
          <p className="w-64 font-bold">Email</p>
          <p className="w-28 font-bold">Role</p>
        </div>
        {assigned &&
          assigned!.map((user: User, i: number) => (
            <li className="flex text-sm mt-1 border-b-2" key={i}>
              <p className="w-32 text-gray-700">{user.username}</p>
              <p className="w-64 text-gray-700">{user.email}</p>
              <p className="w-28 text-gray-700">{user.role}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
