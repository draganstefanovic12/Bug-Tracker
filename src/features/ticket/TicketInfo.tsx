import { Button } from "../../components/Button/Button";
import { Ticket } from "../../types/types";
import axios from "../axios/interceptors";

type InfoProps = {
  ticket: Ticket | undefined;
};

export const TicketInfo = ({ ticket }: InfoProps) => {
  const handleCloseTicket = async () => {
    const options = {
      ticket: ticket?.title,
      proj: ticket?.project,
    };
    await axios.post("api/projects/close", options);
  };

  return (
    <div className="w-2/5 h-2/4 flex flex-col">
      <h1 className="font-bold pt-1">Details for Ticket {ticket?.title}</h1>
      <div className="bg-[#fff] text-sm flex p-2 rounded shadow">
        <div className="gap-4 flex w-2/4 flex-col">
          <p className="font-bold h-7">Ticket Description</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.description}</p>
          <p className="font-bold h-7">Assigned Developer</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.developer}</p>
          <p className="font-bold h-7">Priority</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.priority}</p>
          <p className="font-bold h-7">Ticket submitted by</p>
          <p>{ticket?.submitter}</p>
        </div>
        <div className="gap-4 flex w-2/4 flex-col">
          <p className="font-bold h-7">Ticket type</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.type}</p>
          <p className="font-bold h-7">Project</p>
          <p className="border-b-2 h-7 text-gray-700">{ticket?.project}</p>
          <p className="font-bold h-7">Created</p>
          <p className="border-b-2 h-7 text-gray-700">
            {ticket?.created.slice(0, 10)}
          </p>
          <p className="font-bold h-7">Status</p>
          <p className="h-7 text-gray-700">{ticket?.status}</p>
        </div>
      </div>
      {ticket?.status === "Open" ? (
        <Button
          onClick={handleCloseTicket}
          className="btn-form m-1 w-44 hover:cursor-pointer"
        >
          Set ticket as closed.
        </Button>
      ) : (
        <h1>This ticket is closed.</h1>
      )}
    </div>
  );
};
