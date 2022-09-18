import { useEffect } from "react";

type ListenerProps = {
  children: JSX.Element;
  setIsOpen?: any;
  isOpen?: boolean;
  divRef?: any;
};

const ClickAwayListener = ({
  children,
  setIsOpen,
  isOpen,
  divRef,
}: ListenerProps) => {
  useEffect(() => {
    const handleCLickAway = (e: MouseEvent) => {
      if (divRef && !divRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleCLickAway);
  }, [divRef, setIsOpen]);

  return <>{isOpen && children}</>;
};

export default ClickAwayListener;
