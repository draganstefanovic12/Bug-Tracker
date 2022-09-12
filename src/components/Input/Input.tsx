type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  placeholder: string;
};

export const Input = ({
  onChange,
  label,
  className,
  placeholder,
}: InputProps) => {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        placeholder={placeholder}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};
