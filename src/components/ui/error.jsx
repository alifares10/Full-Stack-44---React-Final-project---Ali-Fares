import React from "react";

const Error = ({ messge }) => {
  return (
    <div className="flex justify-center items-start h-screen w-screen p-8">
      <div className="text-red-500 text-2xl font-bold">Error: {messge}</div>
    </div>
  );
};

export default Error;
