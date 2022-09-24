import "./App.css";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useDatabase } from "./context/DatabaseContext";
import axios from "axios";
import BrowserRoutes from "./routes";

const useUserData = () => {
  return useQuery(["users"], async () => {
    const data = await axios.get(`/users/all`);
    return data.data;
  });
};

const useQueryData = () => {
  return useQuery(["projects"], async () => {
    const data = await axios.get(`$/projects/all`);
    return data.data;
  });
};

const App = () => {
  const { data } = useUserData();
  const { data: projects } = useQueryData();
  const { dispatch } = useDatabase();

  useEffect(() => {
    dispatch({ type: "ADD_USR", payload: data });
    projects && dispatch({ type: "ADD_PROJ", payload: projects.projects });
  }, [data, dispatch, projects]);

  return <BrowserRoutes />;
};

export default App;
