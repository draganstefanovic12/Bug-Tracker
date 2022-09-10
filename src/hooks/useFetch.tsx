import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState();

  useEffect(() => {
    const handleFetch = async () => {
      const data = await axios.get(url);
      setData(data.data);
    };
    handleFetch();
  }, [url]);

  return data;
};
