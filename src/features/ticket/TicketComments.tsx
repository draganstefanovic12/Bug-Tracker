import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { Comment, Ticket } from "../../types/types";
import axios from "../axios/interceptors";

type CommentsProps = {
  ticket: Ticket | undefined;
  setTickets: React.Dispatch<React.SetStateAction<Ticket | undefined>>;
};

export const TicketComments = ({ ticket, setTickets }: CommentsProps) => {
  const user = useAppSelector((user) => user.user?.username);
  const [value, setValue] = useState<string>("");

  const comment = {
    commenter: user,
    message: value,
    created: JSON.stringify(new Date()),
  };
  const options = {
    name: ticket?.project,
    title: ticket?.title,
    comment: comment,
  };

  const handleComment = async () => {
    setValue("");
    setTickets({ ...ticket!, comments: [...ticket!.comments, comment] });
    await axios.post("api/projects/comment", options);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <h1 className="font-bold">Ticket comments</h1>
      <div className="bg-[#fff] p-2 w-2/4 shadow relative">
        <div className="child:w-full child:font-bold child: border-b-2 flex bg-[#fff] p-2">
          <p>User</p>
          <p>Message</p>
          <p>Created at</p>
        </div>
        {ticket?.comments.map((comment: Comment, i) => (
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
            placeholder="Add a comment"
            className="shadow-inner w-full rounded bg-[#ededed] p-2"
          />
          <Button
            onClick={handleComment}
            className="absolute h-10 right-3 btn-form w-24 bottom-4"
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};