import { Link } from "react-router-dom";
import { Input } from "../components/Input/Input";
import { Categories } from "../components/Categories/Categories";
import { useAppSelector } from "../hooks/useRedux";
import { Project, Ticket } from "../types/types";
import { useEffect, useState } from "react";

const categories = ["Subject", "Submitter", "Priority", "Type", "Created"];

export const Tickets = () => {
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
        ticket.submitter.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket.developer.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTickets(filter);
  };

  useEffect(() => {
    const arr = [] as Ticket[];
    projects.map((project: Project) => arr.push(...project.tickets!));
    setInitialTickets(arr);
    setTickets(arr);
  }, [projects]);

  return (
    <div className="bg-[#fff] m-1 p-1 relative">
      <h1 className="text-lg font-bold">All tickets</h1>
      <Input
        className="bg-[#ededed] absolute px-1 top-1.5 right-1 shadow-inner text-sm"
        placeholder="Search"
        onChange={handleSearch}
      />
      <Categories children={categories} className="gap-32" />
      {tickets?.map((ticket, i) => (
        <Link key={i} to={`/tickets/${ticket.project}/${ticket.title}`}>
          <div className="child:w-32 text-sm h-12 items-center child:whitespace-nowrap flex border-b-2 gap-32 hover:bg-slate-50 hover:cursor-pointer">
            <p>{ticket.title}</p>
            <p>{ticket.submitter}</p>
            <p>{ticket.priority}</p>
            <p>{ticket.type}</p>
            <p>{ticket.created.slice(0, 10)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
