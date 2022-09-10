import { Button } from "../../components/Button/Button";
import { UserSelect } from "../user/UserSelect";
import { projectAsync } from "./projectSlice";
import { useAppDispatch } from "../../hooks/useRedux";
import { Field, Form, Formik } from "formik";

export const CreateProject = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Formik
        initialValues={{ name: "", assigned: [], link: "" }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(projectAsync(values));
          setSubmitting(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex bg-[#fff] flex-col w-44 gap-2">
            <h1 className="text-lg">New Project</h1>
            <label>Project name: </label>
            <Field placeholder="Name" name="name" className="input-field" />
            <label>Project link: </label>
            <Field name="link" className="input-field" />
            <label>Assign Users:</label>
            <Field
              name="assigned"
              multiple
              className="input-field overflow-hidden"
              as="select"
            >
              <UserSelect />
            </Field>
            <Button disabled={isSubmitting} type="submit" className="btn-form">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
