import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Purchases from "./pages/Purchases";
import EditProduct from "./pages/EditProduct";
import EditCustomer from "./pages/EditCustomer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const reduxUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch({ type: "LOGOUT" });
        navigate("/signin");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Routes>
        {reduxUser.isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<EditProduct />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<EditCustomer />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="*" element={<NotFound />} />
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
