import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import { Login } from "./pages/Login";
import { login } from "./features/user/userSlice";
import { Projects } from "./pages/Projects";
import { MainPage } from "./pages/MainPage";
import { Register } from "./pages/Register";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";

const App = () => {
  const user = useAppSelector((user) => user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //Checking for existing user on page load
    const user = localStorage.getItem("BTUser");
    if (user) {
      dispatch(login(JSON.parse(user)));
    }
  }, [dispatch]);

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
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        ></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/tickets"></Route>
          <Route path="/roles"></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
