import { Button } from "../../components/Button/Button";
import { actionAsync } from "./userSlice";
import { useAppDispatch } from "../../hooks/useRedux";
import { useState } from "react";

type DemoProps = {
  handleDemoUser: () => void;
};

export const DemoUserSelection = ({ handleDemoUser }: DemoProps) => {
  const [role, setRole] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleRegisterDemoUser = () => {
    dispatch(
      actionAsync({
        username: `demo_user${Math.floor(Math.random() * 10000)}`,
        password: Math.floor(Math.random() * 10000).toString(),
        email: `${Math.floor(Math.random() * 10000).toString()}@demouser.com`,
        role: role,
        api: "register",
      })
    );
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
