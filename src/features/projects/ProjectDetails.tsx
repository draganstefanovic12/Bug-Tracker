import { Button } from "../../components/Button/Button";
import { Project } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
import { ProjectTickets } from "../../components/ProjectTickets/ProjectTickets";
import { AssignedPersonnel } from "../../components/AssignedPersonnel/AssignedPersonnel";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/interceptors";

export const ProjectDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const projects = useAppSelector((projects) => projects.projects.projects);
  const project = projects.find(
    (project: Project) => project.name === params.project
  );

  const handleDelete = async () => {
    const options = { _id: project?._id };
    await axios.post("api/projects/remove", options);
    navigate("/projects");
  };

  return (
    <section className="m-5 relative p-1 h-4/5 bg-[#fff] flex flex-col justify-around">
      <h1 className="text-lg absolute top-1">Project details</h1>
      <div className="flex flex-col">
        <h1>
          Project name: <b>{project?.name}</b>
        </h1>
        <h1>
          Project description: <b>{project?.description}</b>
        </h1>
        <h1>
          Project link:{" "}
          <a className="underline" href={project?.link}>
            {project?.link}
          </a>
        </h1>
      </div>
      <div className="flex p-1 gap-9 bg-[#fff] shadow">
        <AssignedPersonnel assignedUsers={project?.assigned} />
        <ProjectTickets tickets={project?.tickets} />
      </div>
      <Button
        className="btn-form bg-red-600 hover:bg-red-700 shadow absolute bottom-5 right-5"
        onClick={handleDelete}
      >
        Delete project
      </Button>
    </section>
  );
};
