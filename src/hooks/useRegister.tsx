import axios from "axios";
import { useUser } from "../context/UserContext";

type RegisterProps = {
  username: string;
  password: string;
  email: string;
  role?: string;
};

export const useRegister = () => {
  const { dispatch } = useUser();
  const handleRegister = async (values: RegisterProps) => {
    const data = await axios.post(`/users/register`, {
      username: values.username,
      password: values.password,
      email: values.email,
      role: values.role,
    });
    if (data.status === 200) {
      dispatch({ type: "LOGIN", payload: data.data });
    }
  };

  return { handleRegister };
};
