import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { login } from "./features/user/userSlice";
import { MainPage } from "./pages/MainPage";
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
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <MainPage />}></Route>
        <Route
          path="/"
          element={user ? <MainPage /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
