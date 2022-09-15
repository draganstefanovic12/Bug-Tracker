import { Link } from "react-router-dom";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import { Categories } from "../components/Categories/Categories";
import { CreateTicket } from "../features/ticket/CreateTicket";
import { useAppSelector } from "../hooks/useRedux";
import { Project, Ticket } from "../types/types";
import { useEffect, useState } from "react";

const categories = ["Subject", "Submitter", "Priority", "Type", "Created"];

export const Tickets = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const projects = useAppSelector((projects) => projects.projects.projects);
  const [initialTickets, setInitialTickets] = useState<Ticket[]>();
  const [tickets, setTickets] = useState<Ticket[]>();

  //map through project tickets, set all tickets to tickets and initial tickets
  //everytime i search, i filter initialtickets and set filter to that
  //tickets dont get mutated so the search works

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setTickets(initialTickets);
      return;
    }
    const filter = initialTickets?.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket
          .submitter!.toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        ticket.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket.developer!.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTickets(filter);
  };

  useEffect(() => {
    const arr = [] as Ticket[];
    projects.map((project: Project) => arr.push(...project.tickets!));
    setInitialTickets(arr);
    setTickets(arr);
  }, [projects]);

  const handleCreate = () => {
    setIsCreating(true);
  };

  return (
    <div className="bg-[#fff] m-1 rounded p-1 gap-2 flex flex-col relative">
      <h1 className="text-lg font-bold text-[#5c6070]">All tickets</h1>
      <Button
        className="btn-form w-36 h-6 absolute top-9 right-1"
        onClick={handleCreate}
      >
        Create new project
      </Button>
      <Input
        className="bg-[#ededed] absolute px-1 top-1.5 right-1 shadow-inner text-sm"
        placeholder="Search"
        onChange={handleSearch}
      />
      <Categories children={categories} className="gap-28" />
      {tickets?.map((ticket, i) => (
        <div className="child:w-32 text-sm items-center flex border-b-2 gap-28 hover:bg-slate-50">
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
      ))}
      {isCreating && (
        <CreateTicket setIsCreating={setIsCreating} setTickets={setTickets} />
      )}
    </div>
  );
};
