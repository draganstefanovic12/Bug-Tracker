import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import { Roles } from "./pages/Roles";
import { Login } from "./pages/Login";
import { Ticket } from "./features/ticket/Ticket";
import { Tickets } from "./pages/Tickets";
import { Projects } from "./pages/Projects";
import { Register } from "./pages/Register";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ProjectDetails } from "./features/projects/ProjectDetails";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";
import axios from "axios";
import { useUser } from "./context/UserContext";
import { useDatabase } from "./context/DatabaseContext";

//Checking for existing user on page load
//If user exists in localStorage, I fetch the users info to check for new notifications
//Fetching all projects on page load

const useUserData = () => {
  const link = "https://drg-bug-tracker.herokuapp.com";
  return useQuery(["users"], async () => {
    const data = await axios.get(`${link}/users/all`);
    return data.data;
  });
};

const App = () => {
  const { data } = useUserData();
  const { user } = useUser();
  const { dispatch } = useDatabase();

  useEffect(() => {
    dispatch({ type: "ADD_USR", payload: data });
  }, [data, dispatch]);

  return (
    <Router>
      {user && (
        <>
          <Nav />
          <Dashboard />
        </>
      )}
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/projects" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/projects" />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:project" element={<ProjectDetails />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/:name/:title" element={<Ticket />} />
          <Route path="/roles" element={<Roles />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
