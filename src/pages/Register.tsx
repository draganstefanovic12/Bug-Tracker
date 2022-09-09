import { Button } from "../components/Button/Button";
import { actionAsync } from "../features/user/userSlice";
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

export const Register = () => {
  const user = useAppSelector((user) => user.user);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-5 h-full justify-center items-center bg-[#1b1d1e]">
      <h1 className="text-white after:content-[url('./assets/images/bug.svg')] justify-center flex items-center">
        Welcome to Bug Tracker
      </h1>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(
            actionAsync({
              username: values.username,
              password: values.password,
              email: values.email,
              api: "register",
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
              className="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-25 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {user?.error && <div className="text-red-600">{user.error}</div>}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-stone-700 hover:bg-stone-800 text-white w-20 h-7 font-bold px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </Button>
            <div className="flex flex-col text-xs w-auto items-center">
              <p className="hover:cursor-pointer w-12 underline">Register</p>
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
