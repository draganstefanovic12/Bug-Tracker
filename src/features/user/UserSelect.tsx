import { User } from "../../types/types";
import { useDatabase } from "../../context/DatabaseContext";

export const UserSelect = () => {
  const { users } = useDatabase();

  return users.map((user: User, i: number) => (
    <option value={JSON.stringify(user)} key={i}>
      {user.username}
    </option>
  ));
};
