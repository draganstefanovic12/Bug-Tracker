import close from "../../assets/images/close.svg";
import Button from "../../components/Button";
import { Project } from "../../types/types";
import { UserSelect } from "../user/UserSelect";
import { Field, Form, Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "../axios/interceptors";

type CreateProps = {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateProject = ({ setIsCreating }: CreateProps) => {
  const queryClient = useQueryClient();

  const handleAddProject = async (project: Project) => {
    await axios(`/projects/new`, {
      method: "POST",
      data: project,
    });
  };

  const createMutation = useMutation(handleAddProject, {
    onSuccess: () => {
      setIsCreating(false);
      queryClient.invalidateQueries("projects");
    },
  });

  return (
    <div>
      <Formik
        initialValues={{ name: "", assigned: [], link: "", description: "" }}
        onSubmit={(values) => {
          createMutation.mutate(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex border bg-[#fff] flex-col md:w-2/4 sm:w-3/4 absolute top-0 left-0 translate-x-2/4 translate-y-1/4 p-2 gap-2 shadow rounded">
            <img
              src={close}
              alt="close"
              className="absolute top-0 right-0 h-4 hover:cursor-pointer"
              onClick={() => setIsCreating(false)}
            />
            <h1 className="text-lg">New Project</h1>
            <label>Project name: </label>
            <Field placeholder="Name" name="name" className="input-field" />
            <label>Project link: </label>
            <Field
              name="link"
              placeholder="Website link"
              className="input-field"
            />
            <label>Description: </label>
            <Field
              name="description"
              placeholder="Description"
              className="input-field"
            />
            <label>Assign Users:</label>
            <Field
              name="assigned"
              multiple
              className="input-field overflow-auto h-1/4"
              as="select"
            >
              <UserSelect />
            </Field>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="btn-form self-center"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
