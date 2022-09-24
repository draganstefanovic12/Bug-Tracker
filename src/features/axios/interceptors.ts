import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://dragpersonalproj.xyz" });

//intercepts all axios requests and hands in authorization so i don't have to do it all the time
axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("BTUser")!);
  config.headers!["Authorization"] = `${user.username} ${user.token}`;
  return config;
});

export default axiosInstance;
