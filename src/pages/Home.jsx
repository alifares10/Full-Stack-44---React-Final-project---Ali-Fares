import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/products");
  }, [navigate]);

  return (
    <div className="flex items-center mx-auto p-5 border-4 flex-col max-w-screen flex-grow h-fit">
      Home
    </div>
  );
};

export default Home;
