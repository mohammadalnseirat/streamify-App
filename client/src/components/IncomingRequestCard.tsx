import React, { useState } from "react";
import { getLanguageFlag } from "./FriendsCard";
import { capitalize } from "../lib/utils";
import { CheckIcon, Loader2, ShipWheelIcon, TrashIcon } from "lucide-react";

const IncomingRequestCard = ({
  request,
  isAccepting,
  isRejecting,
  acceptFriendRequestMutation,
  rejectRequestFriendMutation,
  selectedUserAcceptRequest,
  selectedUserRejectRequest,
  setSelectedUserAcceptRequest,
  setSelectedUserRejectRequest,
}) => {
  const isSelectedAccept = selectedUserAcceptRequest === request._id;
  const isSelectedReject = selectedUserRejectRequest === request._id;     
  return (
    <div className="card bg-base-300 border border-primary cursor-pointer w-full">
      <div className="card-body p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Sender Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
            <div className="avatar size-12 sm:size-14 rounded-full bg-base-300">
              <img
                src={request.sender.profilePicture}
                alt={request.sender.fullName}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-4">
              <h3 className="font-semibold text-center sm:text-left">
                {request.sender.fullName}
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="badge badge-outline badge-lg badge-primary text-sm whitespace-nowrap">
                  {getLanguageFlag(request.sender.nativeLanguage)}
                  Native: {request.sender.nativeLanguage}
                </span>
                <span className="badge badge-primary badge-lg text-sm whitespace-nowrap">
                  {getLanguageFlag(request.sender.learningLanguage)}
                  Learning: {capitalize(request.sender.learningLanguage)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={() => {
                try{
                setSelectedUserAcceptRequest(request._id);
                  acceptFriendRequestMutation(request._id, request.sender._id);
                } finally {
                  setTimeout(() => {
                    setSelectedUserAcceptRequest(null);
                  }, 3000);
                }
              }}
              disabled={isAccepting || isSelectedAccept || isRejecting}
              className="btn btn-primary text-white btn-sm flex items-center gap-1 flex-1 sm:flex-none"
            >
              { isSelectedAccept ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <>
                  <CheckIcon className="w-4 h-4 text-white" />
                  Accept
                </>
              )}
            </button>
            <button
              disabled={isRejecting || isSelectedReject || isAccepting}
              onClick={() => {
                try{
                setSelectedUserRejectRequest(request._id);
                rejectRequestFriendMutation(request._id);
                } finally {
                  setTimeout(() => {
                    setSelectedUserRejectRequest(null);
                  }, 3000);
                }
              }}
              className="btn btn-error text-white btn-sm flex items-center gap-1 flex-1 sm:flex-none"
            >
              {isSelectedReject ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <>
                  <TrashIcon className="w-4 h-4 text-white" />
                  Reject
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingRequestCard;
