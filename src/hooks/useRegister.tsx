import axios from "axios";

type RegisterProps = {
  userData: {
    username: string;
    email: string;
    password: string;
  };
};

export const useRegister = () => {
  const handleRegister = async (userData: RegisterProps) => {
    const link = "https://drg-bug-tracker.herokuapp.com/users/all";
    const data = await axios.post(`${link}/users/register`, {
      data: userData,
    });
    return data.data;
  };

  return { handleRegister };
};
