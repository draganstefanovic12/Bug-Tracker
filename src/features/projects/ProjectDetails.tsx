import Button from "../../components/Button";
import { Project } from "../../types/types";
import { useDatabase } from "../../context/DatabaseContext";
import { ProjectTickets } from "./ProjectTickets";
import AssignedPersonnel from "../../components/AssignedPersonnel";
import { AssignUsersToProjects } from "./AssignUsersToProjects";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/interceptors";
import { useUser } from "../../context/UserContext";

export const ProjectDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { projects } = useDatabase();
  const project = projects.find(
    (project: Project) => project.name === params.project
  );

  const handleDelete = async () => {
    const options = { _id: project?._id };
    await axios.post(`/projects/remove`, options);
    navigate("/projects");
  };

  return (
    <section className="m-1 relative p-1 flex flex-col justify-between">
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
      <div className="md:flex gap-5 p-1 rounded">
        <AssignedPersonnel assignedUsers={project?.assigned} />
        <ProjectTickets tickets={project?.tickets} />
      </div>
      {user.role === "admin" && user.username.slice(0, 4) !== "demo" && (
        <Button
          className="btn-form bg-red-600 hover:bg-red-700 shadow-lg absolute bottom-4 right-5"
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
    </section>
  );
};
