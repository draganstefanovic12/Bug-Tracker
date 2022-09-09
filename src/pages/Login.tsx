import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { actionAsync } from "../features/user/userSlice";
import { Formik, Form, Field } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

export const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((user) => user.user);

  return (
    <div className="flex flex-col gap-5 h-full justify-center items-center bg-[#1b1d1e] col-span-2 row-span-2">
      <h1 className="text-white after:content-[url('./assets/images/bug.svg')] justify-center flex items-center">
        Welcome to Bug Tracker
      </h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(
            actionAsync({
              username: values.username,
              password: values.password,
              api: "login",
            })
          );
          user?.state !== "pending" && setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
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
            <Button disabled={isSubmitting} type="submit" className="btn-form">
              Submit
            </Button>
            <div className="flex flex-col text-xs w-auto items-center">
              <Link
                to="/register"
                className="hover:cursor-pointer w-12 underline"
              >
                Register
              </Link>
              <p>
                Sign in as a
                <span className="underline hover:cursor-pointer pl-1">
                  Demo User
                </span>
              </p>
              <p className="hover:cursor-pointer underline">
                Forgot your password?
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
