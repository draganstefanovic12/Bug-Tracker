import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Project } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/interceptors";
import { AssignedPersonnel } from "./AssignedPersonnel";

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
    <section className="bg-[#BDBDBD] p-5">
      <div className="bg-[#fff] flex p-1 flex-col gap-40 shadow">
        <h1>Project name: {project?.name}</h1>
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
      <Button onClick={handleDelete}>Delete project.</Button>
    </section>
  );
};
