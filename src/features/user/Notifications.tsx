import Button from "../../components/Button";
import { Notification } from "../../types/types";
import ClickAwayListener from "../../components/ClickAwayListener";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import axios from "../axios/interceptors";
import { useUser } from "../../context/UserContext";

export const Notifications = () => {
  const { user } = useUser();
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
    await axios.post(`/users/read`, options);
  };

  //Using the length of unread notifications to show notification numbers
  const unread =
    notifications &&
    notifications.filter((notif: Notification) => notif.read === false);

  const notifStyles =
    unread && unread.length > 0 ? "text-red-600" : "text-gray-500";
  const notifRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={notifRef} className="flex items-center">
      <Button
        onClick={handeToggle}
        className="after:content-notification text-sm flex"
      >
        <p className={`${notifStyles} text-sm`}>{unread && unread.length}</p>
      </Button>
      <ClickAwayListener
        isOpen={isOpen}
        divRef={notifRef}
        setIsOpen={setIsOpen}
      >
        <div className="absolute bg-[#fff] rounded flex flex-col p-1 top-9 right-14">
          {notifications && notifications.length > 0 ? (
            notifications
              ?.slice(0, 10)
              .map((notif: Notification, i: number) => (
                <div key={i} className="text-sm p-1 list-none">
                  <li>{notif.comment}</li>
                  <li className="text-slate-600 border-b-2">
                    {formatDistanceToNow(new Date(notif.created))} ago
                  </li>
                </div>
              ))
          ) : (
            <li className="text-sm p-1 list-none">
              You have no notifications.
            </li>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};
