import axios from "axios";
import { useUser } from "../context/UserContext";

type Values = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const { dispatch } = useUser();
  const handleLogin = async (values: Values) => {
    const link = "https://drg-bug-tracker.herokuapp.com";
    const data = await axios.post(`${link}/users/login`, {
      username: values.username,
      password: values.password,
    });
    if (data.status === 200) {
      dispatch({ type: "LOGIN", payload: data.data });
    }
  };

  return { handleLogin };
};
