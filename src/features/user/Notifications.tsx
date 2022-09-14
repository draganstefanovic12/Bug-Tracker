import { Button } from "../../components/Button/Button";
import { useEffect, useRef, useState } from "react";
import { Notification } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
import { ClickAwayListener } from "../../components/ClickAwayListener/ClickAwayListener";

export const Notifications = () => {
  const user = useAppSelector((user) => user.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any>(user?.notifications);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCLickAway = (e: MouseEvent) => {
      if (notifRef && !notifRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleCLickAway);
  }, [notifRef, setIsOpen]);

  const handeToggle = () => {
    setIsOpen(!isOpen);
  };

  const notifs = notifications?.map((notif: Notification) => (
    <li className="text-sm">{notif.comment}</li>
  ));

  return (
    <div ref={notifRef} className="w-44">
      <Button onClick={handeToggle} className="after:content-notification">
        Notifications
      </Button>
      {isOpen && <div className="absolute">{notifs}</div>}
    </div>
  );
};
