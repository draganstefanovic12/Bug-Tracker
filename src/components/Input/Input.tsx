type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  placeholder: string;
  value?: string;
};

export const Input = ({
  onChange,
  label,
  className,
  placeholder,
  value,
}: InputProps) => {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};
