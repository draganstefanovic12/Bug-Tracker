import { TicketInfo } from "../features/ticket/TicketInfo";
import { useAppSelector } from "../hooks/useRedux";
import { Project, Ticket } from "../types/types";
import { useEffect, useState } from "react";

export const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>();
  const projects = useAppSelector((projects) => projects.projects.projects);

  useEffect(() => {
    const arr = [] as Ticket[];
    projects.map((project: Project) => arr.push(...project.tickets!));
    setTickets(arr);
  }, [projects]);

  return (
    <div className="bg-[#fff] m-1 p-1">
      <h1>All tickets</h1>
    </div>
  );
};
