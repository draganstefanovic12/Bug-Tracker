import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Nav";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useUser } from "./context/UserContext";
import { ProjectDetails } from "./features/projects/ProjectDetails";
import { Ticket } from "./features/ticket/Ticket";
import { Login } from "./pages/Login";
import { Projects } from "./pages/Projects";
import { Register } from "./pages/Register";
import { Roles } from "./pages/Roles";
import { Tickets } from "./pages/Tickets";

const BrowserRoutes = () => {
  const { user } = useUser();

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

export default BrowserRoutes;
