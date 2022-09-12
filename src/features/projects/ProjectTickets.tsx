import { Link } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Ticket } from "../../types/types";
import { useState } from "react";

type TicketsProps = {
  tickets: Ticket[] | undefined;
};

export const ProjectTickets = ({ tickets }: TicketsProps) => {
  const [ticket, setTicket] = useState<Ticket[] | undefined>(tickets);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setTicket(tickets);
      return;
    }
    const filter = tickets?.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket.submitter.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket.developer.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTicket(filter);
  };

  return (
    <ul className="bg-[#fff] border-l-2 relative pl-1">
      <h1 className="font-bold">Current tickets: </h1>
      <Input
        className="bg-gray-100 absolute px-1 top-0 right-0.5 text-sm"
        placeholder="Search"
        onChange={handleSearch}
      />
      <div className="flex text-sm border-b-2 border-black">
        <p className="w-32 font-bold">Title</p>
        <p className="w-32 font-bold">Submitter</p>
        <p className="w-32 font-bold">Status</p>
        <p className="w-32 font-bold">Developer</p>
        <p className="w-32 font-bold">Created</p>
      </div>
      {ticket?.map((ticket: Ticket) => (
        <li className="flex text-sm mt-1 border-b-2">
          <p className="w-32">{ticket.title}</p>
          <p className="w-32">{ticket.submitter}</p>
          <p className="w-32">{ticket.status}</p>
          <p className="w-32">{ticket.developer}</p>
          <p className="w-32">{ticket.created.slice(0, 10)}</p>
          <Link
            className="hover:underline"
            to={`/tickets/${ticket.project}/${ticket.title}`}
          >
            See more
          </Link>
        </li>
      ))}
    </ul>
  );
};
