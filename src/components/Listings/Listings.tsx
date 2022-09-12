type ListingProps = {
  children: string[];
};

export const Listings = ({ children }: ListingProps) => {
  return (
    <div className="flex text-sm border-b-2 border-black">
      {children.map((string: string) => (
        <p className="w-32 font-bold">{string}</p>
      ))}
    </div>
  );
};
