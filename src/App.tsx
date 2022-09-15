import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import { Roles } from "./pages/Roles";
import { login } from "./features/user/userSlice";
import { Login } from "./pages/Login";
import { Ticket } from "./features/ticket/Ticket";
import { Project } from "./types/types";
import { Tickets } from "./pages/Tickets";
import { useFetch } from "./hooks/useFetch";
import { Projects } from "./pages/Projects";
import { Register } from "./pages/Register";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { addProject } from "./features/projects/projectSlice";
import { ProjectDetails } from "./features/projects/ProjectDetails";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import axios from "axios";

type Data = {
  projects: Project[];
};

//Checking for existing user on page load
//If user exists in localStorage, I fetch the users info to check for new notifications
//Fetching all projects on page load

const App = () => {
  const user = useAppSelector((user) => user.user);
  const data: Data = useFetch("api/projects/all")!;
  const dispatch = useAppDispatch();

  useEffect(() => {
    data && dispatch(addProject(data.projects));
    const user = JSON.parse(localStorage.getItem("BTUser")!);

    if (user) {
      const handleUpdateUser = async () => {
        const data = await axios.get(
          `https://drg-bug-tracker.herokuapp.com/users/user/${user?.username}`
        );
        const updatedUser = { ...user, notifications: data.data.notifications };
        localStorage.setItem("BTUser", JSON.stringify(updatedUser));
        dispatch(login(updatedUser));
      };
      handleUpdateUser();
    }
  }, [data, dispatch]);

  return (
    <Router>
      {user?.username && (
        <>
          <Nav />
          <Dashboard />
        </>
      )}
      <Routes>
        <Route
          path="/login"
          element={!user?.username ? <Login /> : <Navigate to="/projects" />}
        />
        <Route
          path="/register"
          element={!user?.username ? <Register /> : <Navigate to="/projects" />}
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
