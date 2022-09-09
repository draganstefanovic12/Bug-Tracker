import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { actionAsync } from "../features/user/userSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import * as Yup from "yup";

export const Register = () => {
  const user = useAppSelector((user) => user.user);
  const dispatch = useAppDispatch();

  //Yup schema for registration
  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username is too short.")
      .max(10, "Username is too long.")
      .required("Username is required."),
    email: Yup.string().email("Invalid email.").required("Email is required."),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match."
    ),
  });

  return (
    <div className="flex flex-col gap-5 h-full justify-center items-center bg-[#1b1d1e] col-span-2 row-span-2">
      <h1 className="text-white after:content-[url('./assets/images/bug.svg')] justify-center flex items-center">
        Welcome to Bug Tracker
      </h1>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        validationSchema={signUpSchema}
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
          <Form className="flex bg-[#fff] flex-col justify-center items-center text-center p-3 gap-3 h-3/5 w-80 rounded shadow appearance-none border">
            <h1 className="text-lg">Register</h1>
            <Field
              type="username"
              name="username"
              placeholder="Username"
              className="input-field"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-xs text-red-600"
            />
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-xs text-red-600"
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
            />
            <Field
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              className="input-field"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-xs text-red-600"
            />
            {user?.error && <div className="text-red-600">{user.error}</div>}
            <Button disabled={isSubmitting} type="submit" className="btn-form">
              Submit
            </Button>
            <div className="flex flex-col text-xs w-auto items-center">
              <Link to="/login" className="hover:cursor-pointer w-12 underline">
                Login
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
