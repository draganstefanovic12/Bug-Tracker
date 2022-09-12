import { useParams } from "react-router-dom";
import { TicketInfo } from "../features/ticket/TicketInfo";
import { TicketComments } from "../features/ticket/TicketComments";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect, useState } from "react";
import { Project, Ticket as Tickets } from "../types/types";

export const Ticket = () => {
  const [ticket, setTicket] = useState<Tickets | undefined>();
  //Assuming i have project/then ticket in the title
  const params = useParams();
  const projects = useAppSelector((projects) => projects.projects.projects);

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
    <div className="p-2">
      <TicketInfo ticket={ticket} />
      <TicketComments ticket={ticket} setTickets={setTicket} />
    </div>
  );
};
