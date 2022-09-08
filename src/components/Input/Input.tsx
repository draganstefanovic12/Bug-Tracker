type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ onChange }: InputProps) => {
  return <input onChange={onChange} />;
};
