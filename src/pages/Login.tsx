import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { DemoUserSelection } from "../features/user/DemoUserSelection";
import { Formik, Form, Field } from "formik";

export const Login = () => {
  const [demoUser, setDemoUser] = useState<boolean>(false);
  const { user } = useUser();
  const { handleLogin } = useLogin();

  const handleDemoUser = () => {
    setDemoUser(!demoUser);
  };

  return (
    <div className="flex flex-col gap-5 h-full justify-center items-center bg-[#fff] col-span-2 row-span-2">
      <h1 className="after:content-bug justify-center flex items-center">
        Welcome to Bug Tracker
      </h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          handleLogin({
            username: values.username,
            password: values.password,
          });
        }}
      >
        {({ isSubmitting }) =>
          !demoUser ? (
            <Form className="flex bg-[#fff] flex-col justify-center items-center text-center p-3 gap-7 h-96 w-72 rounded shadow appearance-none border">
              <h1 className="text-lg">Login</h1>
              <Field
                type="username"
                name="username"
                placeholder="Username"
                className="input-field"
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
              />
              {user?.error && <div className="text-red-600">{user.error}</div>}
              <Button
                disabled={isSubmitting}
                type="submit"
                className="btn-form"
              >
                Submit
              </Button>
              <div className="flex flex-col text-xs w-auto items-center">
                <Link
                  to="/register"
                  className="hover:cursor-pointer w-12 underline"
                >
                  Register
                </Link>
                <p onClick={handleDemoUser}>
                  Sign in as a
                  <span className="underline hover:cursor-pointer pl-1">
                    Demo User
                  </span>
                </p>
              </div>
            </Form>
          ) : (
            <DemoUserSelection handleDemoUser={handleDemoUser} />
          )
        }
      </Formik>
    </div>
  );
};
