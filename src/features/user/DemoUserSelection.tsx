import Button from "../../components/Button";
import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";

type DemoProps = {
  handleDemoUser: () => void;
};

export const DemoUserSelection = ({ handleDemoUser }: DemoProps) => {
  const [role, setRole] = useState<string>("");
  const { handleRegister } = useRegister();

  const handleRegisterDemoUser = () => {
    handleRegister({
      username: `demo_user${Math.floor(Math.random() * 10000)}`,
      password: Math.floor(Math.random() * 10000).toString(),
      email: "demo@demouser.com",
      role: role,
    });
  };

  return (
    <div className="items-center flex border shadow p-5 flex-col">
      <h1 className="mb-5">Select a role you would like to preview: </h1>
      <div className="flex gap-10">
        <p
          className="before:content-user hover:cursor-pointer hover:bg-slate-100 w-32 flex flex-col text-center"
          onClick={() => setRole("user")}
        >
          User
        </p>
        <p
          className="before:content-developer hover:cursor-pointer hover:bg-slate-100 w-32 before:block flex flex-col text-center"
          onClick={() => setRole("developer")}
        >
          Developer
        </p>
        <p
          className="before:content-admin hover:cursor-pointer hover:bg-slate-100 before:block w-32 flex flex-col text-center"
          onClick={() => setRole("admin")}
        >
          Admin
        </p>
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
