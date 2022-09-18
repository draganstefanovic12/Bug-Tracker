import { useParams } from "react-router-dom";
import { TicketInfo } from "./TicketInfo";
import { useDatabase } from "../../context/DatabaseContext";
import { TicketComments } from "./TicketComments";
import { useEffect, useState } from "react";
import { Project, Ticket as Tickets } from "../../types/types";

export const Ticket = () => {
  const [ticket, setTicket] = useState<Tickets | undefined>();
  const params = useParams();
  const { projects } = useDatabase();

  useEffect(() => {
    const project = projects.find(
      (project: Project) => project.name === params.name
    );
    const ticket = project?.tickets?.find(
      (ticket: Tickets) => ticket.title === params.title
    );
    setTicket(ticket);
  }, [params.name, params.title, projects]);

  return (
    <div className="p-2 w-full gap-3 flex">
      <TicketInfo ticket={ticket} />
      <TicketComments ticket={ticket} />
    </div>
  );
};
