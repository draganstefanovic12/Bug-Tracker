import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { Project } from "../types/types";
import { useQuery } from "react-query";
import { addProject } from "../features/projects/projectSlice";
import { CreateProject } from "../features/projects/CreateProject";
import { useEffect, useState } from "react";
import axios from "../features/axios/interceptors";
import { useDatabase } from "../context/DatabaseContext";

const useQueryData = () => {
  const link = "https://drg-bug-tracker.herokuapp.com";
  return useQuery(["projects"], async () => {
    const data = await axios.get(`${link}/projects/all`);
    return data.data;
  });
};

export const Projects = () => {
  const { isLoading, data } = useQueryData();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { dispatch } = useDatabase();

  const handleCreate = () => {
    setIsCreating(true);
  };

  useEffect(() => {
    data && dispatch({ type: "ADD_PROJ", payload: data });
  }, [data, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
          {data &&
            data.projects.map((project: Project, i: number) => (
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
