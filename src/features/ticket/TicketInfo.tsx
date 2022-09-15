import { Ticket } from "../../types/types";

type InfoProps = {
  ticket: Ticket | undefined;
};

export const TicketInfo = ({ ticket }: InfoProps) => {
  return (
    <>
      <h1 className="font-bold">Details for Ticket {ticket?.title}</h1>
      <div className="bg-[#fff] text-sm w-2/4 flex gap-5 p-2 rounded shadow">
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
          <p className="border-b-2 h-7 text-gray-700">
            {ticket?.created.slice(0, 10)}
          </p>
          <p className="font-bold h-7">Updated</p>
        </div>
      </div>
    </>
  );
};
