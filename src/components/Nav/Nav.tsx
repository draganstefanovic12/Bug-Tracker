import { Button } from "../Button/Button";
import { useState } from "react";
import { Notification } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";

export const Nav = () => {
  const user = useAppSelector((user) => user.user)!;
  const [notifications, setNotifications] = useState<any>(user.notifications);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const notifs = notifications?.map((notif: Notification) => (
    <li className="text-sm">{notif.comment}</li>
  ));

  const handeToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between px-1 h-9 bg-[#fff] drop-shadow">
      <h1 className="flex items-center select-none">
        Logged in as: {user.username} ({user.role})
      </h1>
      <div className="w-44">
        <Button onClick={handeToggle} className="after:content-notification">
          Notifications
        </Button>
        {isOpen && <div className="absolute">{notifs}</div>}
      </div>
    </nav>
  );
};
