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
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";

const App = () => {
  const user = useAppSelector((user) => user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    /* Checking for existing user on page load */
    const user = localStorage.getItem("BTUser");
    if (user) {
      dispatch(login(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/login"
          element={!user?.username ? <Login /> : <MainPage />}
        ></Route>
        <Route
          path="/"
          element={user?.username ? <MainPage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/register"
          element={!user?.username ? <Register /> : <Navigate to="/register" />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
