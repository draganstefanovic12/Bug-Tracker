import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { Ticket } from "../../types/types";
import { useState } from "react";
import Categories from "../../components/Categories";

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
        ticket
          .submitter!.toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        ticket.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket.developer!.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTicket(filter);
  };

  const categories = ["Title", "Submitter", "Status", "Developer", "Created"];

  return (
    <div className="w-full">
      <h1 className="font-bold">Current tickets: </h1>
      <ul className="bg-[#fff] border-l-2 relative pl-1 rounded shadow border h-80 p-2">
        <Input
          className="bg-[#ededed] absolute px-1 top-1 shadow-inner right-2 text-sm"
          placeholder="Search"
          onChange={handleSearch}
        />
        <Categories children={categories} />
        {ticket?.map((ticket: Ticket, i) => (
          <li key={i} className="child:w-32 flex text-sm mt-1 border-b-2">
            <p>{ticket.title}</p>
            <p>{ticket.submitter}</p>
            <p>{ticket.status}</p>
            <p>{ticket.developer}</p>
            <p>{ticket.created.slice(0, 10)}</p>
            <Link
              className="hover:underline"
              to={`/tickets/${ticket.project}/${ticket.title}`}
            >
              See more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
