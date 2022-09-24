import axios from "axios";
import { useUser } from "../context/UserContext";

type Values = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const { dispatch } = useUser();
  const handleLogin = async (values: Values) => {
    const data = await axios.post(`/users/login`, {
      username: values.username,
      password: values.password,
    });
    if (data.status === 200) {
      dispatch({ type: "LOGIN", payload: data.data });
    }
  };

  return { handleLogin };
};
