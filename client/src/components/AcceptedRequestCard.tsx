import { ClockIcon, MessageSquareIcon } from "lucide-react";
import React from "react";

const AcceptedRequestCard = ({ notification }) => {
  return (
    <div className="card bg-base-300 border border-primary shadow-sm shadow-primary transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-10 rounded-full mt-1">
            <img
              src={notification.recipient.profilePicture}
              alt={notification.recipient.fullName}
            />
          </div>
          <div className="flex-1">
            <h3 className='font-semibold'>{notification.recipient.fullName}</h3>
            <p className="text-sm my-1">
              {notification.recipient.fullName} accepted your friend request
            </p>
            <p className="text-xs flex items-center gap-1 opacity-70">
              <ClockIcon className="size-4" />
              Recently
            </p>

          </div>
          <div className="badge badge-success">
            <MessageSquareIcon className="h-4 w-4 mr-1" />
            New Friend
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptedRequestCard;
