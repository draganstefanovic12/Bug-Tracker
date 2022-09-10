import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { CreateProject } from "../features/projects/CreateProject";
import { addProject, Project } from "../features/projects/projectSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

type Data = {
  projects: Project[];
};

export const Projects = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((projects) => projects.projects.projects);
  const data: Data = useFetch("api/projects/all")!;

  useEffect(() => {
    data && dispatch(addProject(data.projects));
  }, [data, dispatch]);

  return (
    <div className="">
      <CreateProject />
      {projects?.map((project, i: number) => (
        <h1 key={i}>{project.name}</h1>
      ))}
    </div>
  );
};
