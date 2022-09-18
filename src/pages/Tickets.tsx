import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Categories from "../components/Categories";
import { useDatabase } from "../context/DatabaseContext";
import { CreateTicket } from "../features/ticket/CreateTicket";
import { Project, Ticket } from "../types/types";
import { useEffect, useState } from "react";

const categories = ["Subject", "Submitter", "Priority", "Type", "Created"];

export const Tickets = () => {
  const { projects } = useDatabase();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [proj, setProj] = useState(projects);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setProj(projects);
      return;
    }
    const filter = projects.map((project: Project) => {
      return {
        ...project,
        tickets: project.tickets!.filter(
          (ticket: Ticket) =>
            ticket.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            ticket
              .submitter!.toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            ticket.status
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            ticket
              .developer!.toLowerCase()
              .includes(e.target.value.toLowerCase())
        ),
      };
    }) as Project[];
    setProj(filter);
  };

  useEffect(() => {
    setProj(projects);
  }, [projects]);

  const handleCreate = () => {
    setIsCreating(true);
  };

  return (
    <section className="relative">
      <div className="bg-[#fff] m-1 rounded p-1 gap-2 flex flex-col">
        <h1 className="text-lg font-bold text-[#5c6070] pl-1">All tickets</h1>
        <Button
          className="btn-form w-36 h-6 absolute bottom-2 right-1 flex text-sm text-center justify-center"
          onClick={handleCreate}
        >
          Create new
        </Button>
        <Input
          className="bg-[#ededed] absolute px-1 top-1.5 right-1 shadow-inner text-sm"
          placeholder="Search"
          onChange={handleSearch}
        />
        <Categories children={categories} className="gap-28" />
        {proj?.map((project: Project) =>
          project.tickets!.map((ticket: Ticket, i) => (
            <div
              key={i}
              className="child:w-32 text-sm items-center flex border-b-2 gap-28 hover:bg-slate-50"
            >
              <p>{ticket.title}</p>
              <p>{ticket.submitter}</p>
              <p>{ticket.priority}</p>
              <p>{ticket.type}</p>
              <p>{ticket.created.slice(0, 10)}</p>
              <Link
                className="hover:underline"
                key={i}
                to={`/tickets/${ticket.project}/${ticket.title}`}
              >
                See more
              </Link>
            </div>
          ))
        )}
        {isCreating && <CreateTicket setIsCreating={setIsCreating} />}
      </div>
    </section>
  );
};
