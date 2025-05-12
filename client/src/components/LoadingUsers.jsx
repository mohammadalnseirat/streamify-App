import React from 'react'

const LoadingUsers = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-5">
      <span className="loading loading-ring loading-sm sm:loading-lg text-primary"></span>
      <span className="text-sm text-primary">Loading...</span>
    </div>
  );
}

export default LoadingUsers