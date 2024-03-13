import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Purchases from "./pages/Purchases";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const reduxUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        if (!reduxUser.isAuth) {
          dispatch({
            type: "LOGIN",
            payload: {
              id: user.uid,
              email: user.email,
              token: user.accessToken,
              isAuth: true,
            },
          });
        }
      } else {
        dispatch({ type: "LOGOUT" });
        console.log("No user");
      }
    });

    return unsubscribe;
  }, [reduxUser.isAuth]);

  return (
    <>
      <Routes>
        {reduxUser.isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/purchases" element={<Purchases />} />
          </>
        ) : (
          <Route path="*" element={<SignIn />} />
        )}

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
