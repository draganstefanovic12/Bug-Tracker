import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { addProject } from "../features/projects/projectSlice";
import { Categories } from "../components/Categories/Categories";
import { CreateProject } from "../features/projects/CreateProject";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import axios from "../features/axios/interceptors";

export const Projects = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const projects = useAppSelector((projects) => projects.projects.projects);
  const dispatch = useAppDispatch();

  const handleCreate = () => {
    setIsCreating(true);
  };

  useEffect(() => {
    const handleProject = async () => {
      const proj = await axios.get(
        "https://drg-bug-tracker.herokuapp.com/projects/all"
      );
      proj && dispatch(addProject(proj.data.projects));
    };
    handleProject();
  }, [dispatch]);

  const categories = ["Name", "Description", "Options"];

  return (
    <section className="flex p-1">
      <div className="flex flex-col w-full md:block">
        <ul className="flex flex-col gap-2 w-full p-1 bg-[#fff] rounded text-sm shadow relative">
          <h1 className="font-bold text-lg">All projects</h1>
          <Button
            className="btn-form w-36 h-6 absolute right-1"
            onClick={handleCreate}
          >
            Create new project
          </Button>
          <Categories
            children={categories}
            className="justify-between child:w-20"
          />
          {projects?.map((project, i: number) => (
            <li
              key={i}
              className="flex p-1 justify-between shadow-sm hover:bg-slate-50"
            >
              <p className="w-20">{project.name}</p>
              <p className="w-20 whitespace-nowrap">{project.description}</p>
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
