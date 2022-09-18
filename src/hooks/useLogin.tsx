import axios from "axios";

type UserData = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const handleLogin = async (userData: UserData) => {
    const link = "https://drg-bug-tracker.herokuapp.com/users/all";
    const data = await axios.post(`${link}/users/login`, {
      data: userData,
    });
    return data.data;
  };

  return { handleLogin };
};
