import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import "./styles/index.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, deleteUser } from "./redux/reducers/authReducer";
// import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();

  const newUser = localStorage.getItem("user") || null;

  useEffect(() => {
    dispatch(addUser(newUser));

    return () => {
      dispatch(deleteUser());
    };
  }, [newUser]);

  const { user } = useSelector((state) => state.auth);

  return (
    // <Toaster>
    <div className="App">
      <Router>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route path="/home" element={user ? <Home /> : <Login />} />
        </Routes>
      </Router>
    </div>
    // </Toaster>
  );
}

export default App;
