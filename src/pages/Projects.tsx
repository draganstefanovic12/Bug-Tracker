import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { Project } from "../types/types";
import { useFetch } from "../hooks/useFetch";
import { addProject } from "../features/projects/projectSlice";
import { CreateProject } from "../features/projects/CreateProject";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

type Data = {
  projects: Project[];
};

export const Projects = () => {
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const projects = useAppSelector((projects) => projects.projects.projects);
  const data: Data = useFetch("api/projects/all")!;

  useEffect(() => {
    //add project pushes the new project into the fetched array of projects
    data && dispatch(addProject(data.projects));
  }, [data, dispatch]);

  const handleCreate = () => {
    setIsCreating(true);
  };

  return (
    <section className="flex px-1">
      <div className="flex flex-col w-full md:block md:w-3/4 p-1">
        <Button className="btn-form w-40" onClick={handleCreate}>
          Create new project
        </Button>
        <h1 className="font-bold">Projects</h1>
        <ul className="flex flex-col gap-3 w-full bg-[#fff] text-sm shadow">
          {projects?.map((project, i: number) => (
            <li key={i} className="flex w-4/4 p-1 justify-between shadow-sm">
              <p className="w-20">{project.name}</p>
              <p className="w-20 whitespace-nowrap">{project.description}</p>
              <div className="flex flex-col">
                <Link
                  className="hover:underline"
                  to={`/projects/${project.name}/users`}
                >
                  Manage users
                </Link>
                <Link
                  className="hover:underline"
                  to={`/projects/${project.name}/`}
                >
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isCreating && <CreateProject setIsCreating={setIsCreating} />}
    </section>
  );
};
