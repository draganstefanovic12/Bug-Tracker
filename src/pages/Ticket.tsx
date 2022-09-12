import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect, useState } from "react";
import { Comment, Project, Ticket as Tickets } from "../types/types";

export const Ticket = () => {
  const [ticket, setTicket] = useState<Tickets>();
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
      <h1 className="font-bold">Details for Ticket {ticket?.title}</h1>
      <div className="bg-[#fff] w-2/4 flex gap-5 p-2 shadow">
        <div className="gap-4 flex flex-col">
          <p className="font-bold h-7">Ticket Description</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.description}</p>
          <p className="font-bold h-7">Assigned Developer</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.developer}</p>
          <p className="font-bold h-7">Priority</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.priority}</p>
          <p className="font-bold h-7">Ticket submitted by</p>
          <p>{ticket?.submitter}</p>
        </div>
        <div className="gap-4 flex flex-col">
          <p className="font-bold h-7">Ticket type</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.type}</p>
          <p className="font-bold h-7">Project</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.project}</p>
          <p className="font-bold h-7">Created</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.created}</p>
          <p className="font-bold h-7">Updated</p>
          <p>{}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold">Ticket comments</h1>
        <div className="flex bg-[#fff] w-2/4 shadow p-2">
          <p className="w-48 font-bold border-b-2">Commenter</p>
          <p className="w-48 font-bold border-b-2">Message</p>
          <p className="w-48 font-bold border-b-2">Created</p>
        </div>
        {ticket?.comments.map((comment: Comment) => (
          <div>
            <p>{comment.commenter.username}</p>
            <p>{comment.message}</p>
            <p>{comment.created}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
