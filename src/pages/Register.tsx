import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { actionAsync } from "../features/user/userSlice";
import { DemoUserSelection } from "../features/user/DemoUserSelection";
import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

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

const registerFields = [
  { type: "username", placeholder: "Username", name: "username" },
  { type: "email", placeholder: "Email", name: "email" },
  { type: "password", placeholder: "Password", name: "password" },
  { type: "password", placeholder: "Username", name: "confirmationPassword" },
];

export const Register = () => {
  const user = useAppSelector((user) => user.user);
  const [demoUser, setDemoUser] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDemoUser = () => {
    setDemoUser(!demoUser);
  };

  return (
    <div className="flex flex-col gap-5 h-full justify-center bg-[#fff] items-center col-span-2 row-span-2">
      <h1 className="after:content-[url('./assets/images/bug.svg')] justify-center flex items-center">
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
        {({ isSubmitting }) =>
          !demoUser ? (
            <Form className="flex bg-[#fff] flex-col justify-center items-center text-center p-3 gap-3 h-3/5 w-80 rounded shadow appearance-none border">
              <h1 className="text-lg">Register</h1>
              {registerFields.map((field, i) => (
                <Fragment key={i}>
                  <Field
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="input-field"
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-xs text-red-600"
                  />
                </Fragment>
              ))}
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
                  to="/login"
                  className="hover:cursor-pointer w-12 underline"
                >
                  Login
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
