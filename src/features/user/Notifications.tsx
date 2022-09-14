import { Button } from "../../components/Button/Button";
import { Notification } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
import { useRef, useState } from "react";
import { ClickAwayListener } from "../../components/ClickAwayListener/ClickAwayListener";

export const Notifications = () => {
  const user = useAppSelector((user) => user.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any>(user?.notifications);

  const handeToggle = () => {
    setIsOpen(!isOpen);
  };

  const notifs = notifications?.map((notif: Notification) => (
    <li className="text-sm">{notif.comment}</li>
  ));

  const notifRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={notifRef} className="w-44">
      <Button onClick={handeToggle} className="after:content-notification">
        Notifications
      </Button>
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
