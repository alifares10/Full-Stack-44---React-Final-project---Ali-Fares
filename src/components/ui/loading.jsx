import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-start h-screen w-screen p-8">
      <Loader2 size="50 " className="animate-spin" />
    </div>
  );
};

export default Loading;
