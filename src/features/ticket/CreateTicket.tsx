import { Button } from "../../components/Button/Button";
import { Project } from "../../types/types";
import { UserSelect } from "../user/UserSelect";
import { ticketAsync } from "./ticketSlice";
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import close from "../../assets/images/close.svg";

type CreateTicketProps = {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateTicket = ({ setIsCreating }: CreateTicketProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((user) => user.user?.username);
  const projects = useAppSelector((projects) => projects.projects.projects);

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          assigned: [],
          description: "",
          priority: "Low",
          type: "Bugs/Errors",
          project: projects[0].name,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setIsCreating(false);
          setSubmitting(true);
          dispatch(
            ticketAsync({
              ...values,
              status: "Open",
              developer: user,
              submitter: user,
              created: JSON.stringify(new Date()),
              comments: [],
            })
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex bg-[#fff] flex-col md:w-2/4 sm:w-3/4 absolute top-0 left-0 translate-x-2/4 p-2 gap-2 shadow rounded">
            <img
              alt="close"
              src={close}
              className="absolute top-0 right-0 h-4 hover:cursor-pointer"
              onClick={() => setIsCreating(false)}
            />
            <h1 className="text-lg">New Ticket</h1>
            <label>Ticket name: </label>
            <Field placeholder="Name" name="title" className="input-field" />
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
            <label>Priority:</label>
            <Field name="priority" as="select" className="border" select>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Field>
            <label>Type: </label>
            <Field name="type" as="select" className="border">
              <option value="Bugs/Errors">Bugs/Errors</option>
              <option value="Technical">Technical</option>
            </Field>
            <label>Select project to assign the ticket to: </label>
            <Field name="project" as="select" className="border">
              {projects.map((project: Project, i) => (
                <option key={i} value={project.name}>
                  {project.name}
                </option>
              ))}
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
