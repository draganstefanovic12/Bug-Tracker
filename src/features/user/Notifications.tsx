import { Button } from "../../components/Button/Button";
import { Notification } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
import { useEffect, useRef, useState } from "react";
import { ClickAwayListener } from "../../components/ClickAwayListener/ClickAwayListener";
import axios from "../axios/interceptors";

export const Notifications = () => {
  const user = useAppSelector((user) => user.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any>(user?.notifications);

  const handeToggle = () => {
    setIsOpen(!isOpen);
    handleRead();
  };

  useEffect(() => {
    //Updates user notifications on page refresh
    setNotifications(user?.notifications);
  }, [user]);

  //Setting notifications to read
  const handleRead = async () => {
    const options = {
      user: user?.username,
    };
    setNotifications(
      notifications.map((notif: Notification) => {
        return { ...notif, read: true };
      })
    );
    await axios.post("api/users/read", options);
  };

  //Using the length of unread notifications to show notification numbers
  const unreadNotifs = notifications.filter(
    (notif: Notification) => notif.read === false
  );

  const notifs = notifications?.map((notif: Notification) => (
    <li className="text-sm">{notif.comment}</li>
  ));

  const notifRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={notifRef} className="w-44 flex items-center">
      <Button
        onClick={handeToggle}
        className="after:content-notification text-sm flex"
      >
        Notifications
      </Button>
      <p className="text-red-500 text-sm">{unreadNotifs.length}</p>
      <ClickAwayListener
        isOpen={isOpen}
        notifRef={notifRef}
        setIsOpen={setIsOpen}
      >
        <div className="absolute">{notifs}</div>
      </ClickAwayListener>
    </div>
  );
};
