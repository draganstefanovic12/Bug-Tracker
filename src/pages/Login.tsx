import { Button } from "../components/Button/Button";
import { loginAsync } from "../features/user/userSlice";
import { useAppDispatch } from "../hooks/useRedux";
import { Formik, Form, Field, ErrorMessage } from "formik";

/* make login form later */
export const Login = () => {
  const dispatch = useAppDispatch();

  const fieldStyles =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  return (
    <div className="flex h-full justify-center">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            loginAsync({ username: values.username, password: values.password })
          );
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex justify-center text-center p-3 flex-col gap-5 h-15 items-center">
            <h1>Login</h1>
            <Field
              type="username"
              name="username"
              placeholder="Username"
              className={fieldStyles}
            />
            <ErrorMessage name="username" component="div" />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={fieldStyles}
            />
            <ErrorMessage name="password" component="div" />
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-stone-700 hover:bg-stone-800 text-white w-20 h-7 font-bold px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
