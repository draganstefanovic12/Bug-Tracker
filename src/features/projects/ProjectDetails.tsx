import { Button } from "../../components/Button/Button";
import { Project } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
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
    <section className="p-5">
      <h1 className="font-bold">{project?.name}</h1>
      <div className="bg-[#fff] flex p-1 gap-40">
        <AssignedPersonnel assignedUsers={project?.assigned} />
        <ul className="">
          <p>Current tickets: </p>
          {project?.issues?.map((ticket) => (
            <li>
              <p>{ticket}</p>
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="btn-form bg-red-600 hover:bg-red-700"
        onClick={handleDelete}
      >
        Delete project
      </Button>
    </section>
  );
};
