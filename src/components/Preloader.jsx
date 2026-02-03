import React from "react";

const PreLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col  items-center pt-85 ">
    <div className="text-blue-500 text-lg font-semibold">
        Stay tune!!
    </div>
      <div className="flex pl-5   text-lg  font-semibold text-blue-400">
        Loading
        <span className="ml-1 animate-bounce">.</span>
        <span className="ml-1 animate-bounce [animation-delay:0.15s]">.</span>
        <span className="ml-1 animate-bounce [animation-delay:0.3s]">.</span>
      </div>
    </div>
  );
};

export default PreLoader;
