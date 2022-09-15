import { User } from "../../types/types";
import { useFetch } from "../../hooks/useFetch";

export const UserSelect = () => {
  const data: User[] = useFetch(
    "https://drg-bug-tracker.herokuapp.com/users/all"
  )!;

  const users =
    data &&
    data.map((user: User, i: number) => (
      <option value={JSON.stringify(user)} key={i}>
        {user.username}
      </option>
    ));

  return <>{users}</>;
};
