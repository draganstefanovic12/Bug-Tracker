import { CreateProject } from "../features/projects/CreateProject";
import { Project } from "../features/projects/projectSlice";
import { useFetch } from "../hooks/useFetch";

type Data = {
  projects: Project[];
};

export const Projects = () => {
  const data: Data = useFetch("api/projects/all")!;

  return (
    <div className="">
      <CreateProject />
      {data?.projects.map((project, i: number) => (
        <h1 key={i}>{project.name}</h1>
      ))}
    </div>
  );
};
