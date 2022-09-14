import { Button } from "../../components/Button/Button";
import { Notification } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
import { ClickAwayListener } from "../../components/ClickAwayListener/ClickAwayListener";
import { useEffect, useRef, useState } from "react";
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
  const unread = notifications.filter(
    (notif: Notification) => notif.read === false
  );

  const notifs = notifications?.map((notif: Notification) => (
    <li className="text-sm list-none text-gray-600">{notif.comment}</li>
  ));

  const notifStyles = unread.length > 0 ? "text-red-600" : "text-gray-500";
  const notifRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={notifRef} className="w-44 flex items-center">
      <Button
        onClick={handeToggle}
        className="after:content-notification text-sm flex"
      >
        <p className={`${notifStyles} text-sm`}>{unread.length}</p>
      </Button>
      <ClickAwayListener
        isOpen={isOpen}
        notifRef={notifRef}
        setIsOpen={setIsOpen}
      >
        <div className="absolute bg-[#fff] p-1 top-9 right-16">{notifs}</div>
      </ClickAwayListener>
    </div>
  );
};