import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { CreateProject } from "../features/projects/CreateProject";
import { addProject, Project } from "../features/projects/projectSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { Button } from "../components/Button/Button";
import { Link } from "react-router-dom";

type Data = {
  projects: Project[];
};

export const Projects = () => {
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const projects = useAppSelector((projects) => projects.projects.projects);
  const data: Data = useFetch("api/projects/all")!;

  useEffect(() => {
    data && dispatch(addProject(data.projects));
  }, [data, dispatch]);

  const handleCreate = () => {
    setIsCreating(true);
  };

  return (
    <section className="flex pl-1 bg-[#BDBDBD]">
      <div className="w-3/4">
        <Button
          className="bg-stone-700 hover:bg-stone-800 h-7 text-sm p-1 text-white font-bold shadow rounded"
          onClick={handleCreate}
        >
          Create new project
        </Button>
        <h1>Projects</h1>
        <ul className="flex flex-col gap-3 text-sm bg-[#f2f4f7] rounded shadow">
          {projects?.map((project, i: number) => (
            <li className="flex w-4/4 p-1 justify-between shadow-sm">
              <p className="w-20">{project.name}</p>
              <p className="w-20">{project.link}</p>
              <div className="flex flex-col">
                <Link to={`/project/${project.name}/users`}>Manage users</Link>
                <Link to={`/project/${project.name}/`}>Details</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isCreating && <CreateProject setIsCreating={setIsCreating} />}
    </section>
  );
};
