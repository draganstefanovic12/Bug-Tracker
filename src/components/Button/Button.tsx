type ButtonProps = {
  children: JSX.Element | string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  disabled,
  type,
  className,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={className}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
