import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import { login } from "./features/user/userSlice";
import { Login } from "./pages/Login";
import { Ticket } from "./features/ticket/Ticket";
import { Tickets } from "./pages/Tickets";
import { useFetch } from "./hooks/useFetch";
import { Projects } from "./pages/Projects";
import { MainPage } from "./pages/MainPage";
import { Register } from "./pages/Register";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { addProject } from "./features/projects/projectSlice";
import { ProjectDetails } from "./features/projects/ProjectDetails";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { Project } from "./types/types";
import { Roles } from "./pages/Roles";

type Data = {
  projects: Project[];
};

const App = () => {
  const user = useAppSelector((user) => user.user);
  const data: Data = useFetch("api/projects/all")!;
  const dispatch = useAppDispatch();

  useEffect(() => {
    //Checking for existing user on page load
    //Fetching all projects on page load
    data && dispatch(addProject(data.projects));
    const user = localStorage.getItem("BTUser");
    if (user) {
      dispatch(login(JSON.parse(user)));
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
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:project" element={<ProjectDetails />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/:name/:title" element={<Ticket />} />
          <Route path="/roles" element={<Roles />} />
        </Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
