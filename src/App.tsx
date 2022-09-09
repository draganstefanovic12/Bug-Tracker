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
import { MainPage } from "./pages/MainPage";
import { Register } from "./pages/Register";
import { useEffect } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
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
          element={!user?.username ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/"
          element={user?.username ? <MainPage /> : <Navigate to="/login" />}
        >
          <Route path="/projects"></Route>
          <Route path="/tickets"></Route>
          <Route path="/roles"></Route>
        </Route>
        <Route
          path="/register"
          element={!user?.username ? <Register /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
