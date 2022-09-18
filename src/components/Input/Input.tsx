type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
};

const Input = ({
  onChange,
  label,
  className,
  placeholder,
  value,
  disabled,
}: InputProps) => {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
