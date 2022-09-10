import axios from "axios";
import { useAppSelector } from "../../hooks/useRedux";

const axiosInstance = axios.create();

//Intercepts all axios requests and hands in authorization so i don't have to do it all the time
axiosInstance.interceptors.request.use((config) => {
  const user = useAppSelector((user) => user.user);
  config.headers!["Authorization"] = `${user.username} ${user.token}`;
  return config;
});
