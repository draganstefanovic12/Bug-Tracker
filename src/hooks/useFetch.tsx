import axios from "axios";
import { useAppSelector } from "./useRedux";
import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const user = useAppSelector((user) => user.user);
  const [data, setData] = useState();

  useEffect(() => {
    //Authorization
    const options = {
      headers: {
        Authorization: `${user.username} ${user.token}`,
      },
    };

    const handleFetch = async () => {
      const data = await axios.get(url, options);
      setData(data.data);
    };
    handleFetch();
  }, [url, user.token, user.username]);

  return data;
};
