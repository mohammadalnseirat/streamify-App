import { BellIcon } from 'lucide-react';
import React from 'react'

const NoNotificationsFound = () => {
  return (
    <div className="flex flex-col bg-base-300 p-4 rounded-lg shadow-sm border border-red-500/60 shadow-red-500/30 items-center justify-center py-8 md:py-16 text-center">
      <div className="size-16 rounded-full bg-base-300 shadow border border-red-600 shadow-red-600 flex items-center justify-center mb-4">
        <BellIcon className="size-8 text-red-600  animate-wiggle" />
      </div>
      <h3 className="text-xl capitalize font-semibold mb-2">
        No notifications yet
      </h3>
      <p className="text-base-content opacity-70 max-w-lg">
        When you receive friend requests or messages, they'll appear here.
      </p>
    </div>
  );
};

export default NoNotificationsFound