import { Project } from "../features/projects/projectSlice";
import { useFetch } from "../hooks/useFetch";

type Data = {
  projects: Project[];
};

export const Projects = () => {
  const data: Data = useFetch("api/projects/all")!;

  return (
    <div>
      {data?.projects.map((project) => (
        <h1>{project.name}</h1>
      ))}
    </div>
  );
};
