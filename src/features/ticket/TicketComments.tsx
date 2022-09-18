import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import { Comment, Ticket } from "../../types/types";
import axios from "../axios/interceptors";
import { useUser } from "../../context/UserContext";

type CommentsProps = {
  ticket: Ticket | undefined;
  setTickets: React.Dispatch<React.SetStateAction<Ticket | undefined>>;
};

export const TicketComments = ({ ticket, setTickets }: CommentsProps) => {
  const user = useUser();
  const [error, setError] = useState("");
  const [value, setValue] = useState<string>("");

  const comment = {
    commenter: user,
    message: value,
    created: new Date().toString(),
  };
  const options = {
    name: ticket?.project,
    title: ticket?.title,
    comment: comment,
  };

  const handleComment = async () => {
    if (value.length < 5) {
      setError("Please type a message.");
      return;
    }
    setValue("");
    const link = "https://drg-bug-tracker.herokuapp.com";
    await axios.post(`${link}/projects/comment`, options);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setValue(e.target.value);
  };

  return (
    <div className="w-2/4">
      <h1 className="font-bold pt-1">Ticket comments</h1>
      <div className="bg-[#fff] border p-2 text-sm rounded shadow relative">
        <div className="child:w-full child:font-bold border-b-2 flex bg-[#fff] p-2">
          <p>User</p>
          <p>Message</p>
          <p>Created at</p>
        </div>
        {ticket?.comments!.map((comment: Comment, i) => (
          <div key={i} className="child:w-full child:border-b-2 flex p-2">
            <p>{comment.commenter}</p>
            <p>{comment.message}</p>
            <p>{comment.created!.slice(0, 10)}</p>
          </div>
        ))}
        <div className="p-2">
          <Input
            onChange={handleChange}
            value={value}
            disabled={ticket?.status === "Open" ? false : true}
            placeholder={
              ticket?.status === "Open"
                ? "Add a comment"
                : "You can't leave comments on closed tickets."
            }
            className="shadow-inner w-full rounded bg-[#ededed] p-2"
          />
          <Button
            onClick={handleComment}
            className="absolute h-9 right-3 btn-form w-24 bottom-4"
          >
            Comment
          </Button>
          <p className="text-red-600 absolute">{error}</p>
        </div>
      </div>
    </div>
  );
};
