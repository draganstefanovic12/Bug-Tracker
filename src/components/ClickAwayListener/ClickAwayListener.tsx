import { useEffect, useRef, useState } from "react";

type ListenerProps = {
  children: JSX.Element;
  setIsOpen?: any;
  isOpen?: boolean;
  notifRef?: any;
};

export const ClickAwayListener = ({
  children,
  setIsOpen,
  isOpen,
  notifRef,
}: ListenerProps) => {
  useEffect(() => {
    const handleCLickAway = (e: MouseEvent) => {
      if (notifRef && !notifRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleCLickAway);
  }, [notifRef, setIsOpen]);

  return <div>{isOpen && <>{children}</>}</div>;
};
