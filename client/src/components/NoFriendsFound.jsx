import React from "react";

const NoFriendsFound = ({ title, description }) => {
  return (
    <div className="flex items-center justify-center px-0  md:px-4">
      <div className="card bg-base-300 text-center w-full max-w-xl shadow-sm border border-red-500/60 shadow-red-500/30">
        <div className="card-body text-center">
          <h2 className=" text-center text-xl sm:text-2xl font-semibold">{title}</h2>
          <p className="text-center text-sm sm:text-md text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoFriendsFound;
