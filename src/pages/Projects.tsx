import Button from "../components/Button";
import { Link } from "react-router-dom";
import { Project } from "../types/types";
import { useState } from "react";
import { useDatabase } from "../context/DatabaseContext";
import { CreateProject } from "../features/projects/CreateProject";

export const Projects = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { projects } = useDatabase();

  const handleCreate = () => {
    setIsCreating(true);
  };

  return (
    <section className="flex p-1">
      <div className="flex flex-col w-full md:block">
        <ul className="flex flex-col w-full p-1 bg-[#fff] rounded text-sm shadow">
          <h1 className="font-bold text-lg pl-1">All projects</h1>
          <Button
            className="btn-form w-36 h-6 absolute bottom-2 right-1"
            onClick={handleCreate}
          >
            Create new
          </Button>
          <div className="flex text-sm border-b-2 pl-1 border-black font-bold">
            <p className="w-1/4">Name</p>
            <p className="w-3/4 mr-20">Description</p>
            <p className="ml-5 absolute right-11">Options</p>
          </div>
          {projects &&
            projects.map((project: Project, i: number) => (
              <li key={i} className="flex p-1 shadow-sm hover:bg-slate-50">
                <p className="w-1/4 text-black">{project.name}</p>
                <p className="w-3/4 text-zinc-600 md:whitespace-nowrap">
                  {project.description}
                </p>
                <div className="flex flex-col">
                  <Link
                    className="hover:underline w-20"
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
