import { Button } from "../../components/Button/Button";
import { Project } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
import { ProjectTickets } from "./ProjectTickets";
import { AssignedPersonnel } from "../../components/AssignedPersonnel/AssignedPersonnel";
import { AssignUsersToProjects } from "./AssignUsersToProjects";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/interceptors";

export const ProjectDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((user) => user.user?.role);
  const projects = useAppSelector((projects) => projects.projects.projects);
  const project = projects.find(
    (project: Project) => project.name === params.project
  );

  const handleDelete = async () => {
    const options = { _id: project?._id };
    const link = "https://drg-bug-tracker.herokuapp.com";
    await axios.post(`${link}/projects/remove`, options);
    navigate("/projects");
  };

  return (
    <section className="m-1 relative p-1 flex flex-col justify-around">
      <div className="flex w-full">
        <div className="w-2/4">
          <h1 className="text-lg top-1">Project details</h1>
          <p>
            Project name: <b>{project?.name}</b>
          </p>
          <p>
            Project description: <b>{project?.description}</b>
          </p>
          <p>
            Project link:
            <a className="underline pl-1" href={project?.link}>
              {project?.link}
            </a>
          </p>
        </div>
        <AssignUsersToProjects project={project} />
      </div>
      <div className="flex p-1 gap-9 rounded">
        <AssignedPersonnel assignedUsers={project?.assigned} />
        <ProjectTickets tickets={project?.tickets} />
      </div>
      {user === "admin" && (
        <Button
          className="btn-form bg-red-600 hover:bg-red-700 shadow-lg absolute top-4 right-5"
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
    </section>
  );
};
