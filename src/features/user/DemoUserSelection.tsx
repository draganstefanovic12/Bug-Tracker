import Button from "../../components/Button";
import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";

type DemoProps = {
  handleDemoUser: () => void;
};

const roles = [
  { name: "User", content: "before:content-user" },
  { name: "Developer", content: "before:content-developer" },
  { name: "Admin", content: "before:content-admin" },
];

export const DemoUserSelection = ({ handleDemoUser }: DemoProps) => {
  const [role, setRole] = useState<string>("");
  const { handleRegister } = useRegister();

  const handleRegisterDemoUser = () => {
    handleRegister({
      username: `demo_user${Math.floor(Math.random() * 10000)}`,
      password: Math.floor(Math.random() * 10000).toString(),
      email: `${Math.floor(Math.random() * 10000)}demo@demouser.com`,
      role: role,
    });
  };

  return (
    <div className="items-center flex border shadow p-5 flex-col">
      <h1 className="mb-5">Select a role you would like to preview: </h1>
      <div className="flex gap-10">
        {roles.map((selected, i) => {
          const styles =
            role === selected.name.toLocaleLowerCase() ? "bg-slate-100" : "";
          return (
            <p
              key={i}
              onClick={() => setRole(selected.name.toLowerCase())}
              className={`${selected.content} ${styles} hover:cursor-pointer mb-5 hover:bg-slate-100 w-32 flex flex-col text-center`}
            >
              {selected.name}
            </p>
          );
        })}
      </div>
      <Button className="btn-form" onClick={handleRegisterDemoUser}>
        Submit
      </Button>
      <p
        className="hover:underline hover:cursor-pointer"
        onClick={handleDemoUser}
      >
        Go back
      </p>
    </div>
  );
};
