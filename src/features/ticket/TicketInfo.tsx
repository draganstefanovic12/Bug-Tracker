import Button from "../../components/Button";
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
    await axios.post(`/projects/close`, options);
  };

  return (
    <div className="w-3/5 h-3/4 flex flex-col">
      <h1 className="font-bold pt-1">Details for ticket: {ticket?.title}</h1>
      <div className="bg-[#fff] text-sm flex p-2 border rounded shadow">
        <div className="gap-4 flex w-2/4 flex-col">
          <p className="font-bold h-3">Ticket Description</p>
          <p className="border-b-2 h-14 text-gray-700">{ticket?.description}</p>
          <p className="font-bold h-auto">Assigned Developer</p>
          <p className="border-b-2 h-auto text-gray-700">{ticket?.developer}</p>
          <p className="font-bold h-auto">Priority</p>
          <p className="border-b-2 h-auto text-gray-700">{ticket?.priority}</p>
          <p className="font-bold h-auto">Ticket submitted by</p>
          <p>{ticket?.submitter}</p>
        </div>
        <div className="gap-4 flex w-2/4  flex-col">
          <p className="font-bold h-3">Ticket type</p>
          <p className="border-b-2 h-14 text-gray-700">{ticket?.type}</p>
          <p className="font-bold h-auto">Project</p>
          <p className="border-b-2 h-auto text-gray-700">{ticket?.project}</p>
          <p className="font-bold h-auto">Created</p>
          <p className="border-b-2 h-auto text-gray-700">
            {ticket?.created.slice(0, 10)}
          </p>
          <p className="font-bold h-auto">Status</p>
          <p className="h-auto text-gray-700">{ticket?.status}</p>
        </div>
      </div>
      {ticket?.status === "Open" ? (
        <Button
          onClick={handleCloseTicket}
          className="btn-form mt-1 w-44 hover:cursor-pointer"
        >
          Set ticket as closed.
        </Button>
      ) : (
        <h1 className="font-bold text-black">This ticket is closed.</h1>
      )}
    </div>
  );
};
