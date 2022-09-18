type CategoryProps = {
  children: string[];
  className?: string;
};

const Categories = ({ children, className }: CategoryProps) => {
  return (
    <div className={`flex text-sm border-b-2 border-black ${className}`}>
      {children.map((string: string, i) => (
        <p key={i} className="w-32 font-bold">
          {string}
        </p>
      ))}
    </div>
  );
};

export default Categories;
