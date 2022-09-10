import { useFetch } from "../../hooks/useFetch";

type User = {
  email: string;
  projects: [];
  role: string;
  _id: string;
  username: string;
};

export const UserSelect = () => {
  const data: User[] = useFetch("/api/users/all")!;

  const users =
    data &&
    data.map((user: User, i: number) => (
      <option value={user.username} key={i}>
        {user.username}
      </option>
    ));

  return <>{users}</>;
};
