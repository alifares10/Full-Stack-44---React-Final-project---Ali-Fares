import React from "react";

const Unauthorized = () => {
  return (
    <div className="justify-center flex items-center flex-col mx-auto h-fit min-h-screen p-4 w-screen space-y-2 ">
      <h1 className="text-red-600 text-8xl m-3">Access Denied</h1>
      <p className="text-lg">You are not authorized to view this page</p>
      <p className="text-lg">Only admins can view this page </p>
    </div>
  );
};

export default Unauthorized;
