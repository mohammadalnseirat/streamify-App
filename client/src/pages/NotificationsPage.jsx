import { BellIcon, UserCheckIcon } from "lucide-react";
import useNotification from "../hooks/useNotification";
import useAccept from "../hooks/useAccept";
import useReject from "../hooks/useReject";
import { useState } from "react";
import IncomingRequestCard from "../components/IncomingRequestCard";
import AcceptedRequestCard from "../components/AcceptedRequestCard";
import LoadingNotification from "../components/LoadingNotification";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const [selectedUserAcceptRequest, setSelectedUserAcceptRequest] = useState(null);
  const [selectedUserRejectRequest, setSelectedUserRejectRequest] = useState(null);

  //! Get notifications (incoming requests and accepted requests):
  const { acceptedRequests, inComingRequests, isFriendRequestsLoading } =
    useNotification();
  //! Accept a friend request:
  const { acceptFriendRequestMutation, isAccepting } = useAccept();

  //! Reject a friend request:
  const { rejectFriendRequestMutation, isRejecting } = useReject();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-4xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-[400] mb-6">
          Notifications
        </h1>

        {/* Is loading */}
        {isFriendRequestsLoading && <LoadingNotification />}

        {!isFriendRequestsLoading && inComingRequests.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl flex items-center gap-2 font-[400]">
              <UserCheckIcon className="size-5 text-primary" />
              Friend Requests
              <span className="badge badge-primary  ml-2 rounded-full">
                {inComingRequests.length}
              </span>
            </h2>
            <div className="space-y-3">
              {inComingRequests.map((req) => (
                <IncomingRequestCard
                  key={req._id}
                  request={req}
                  isAccepting={isAccepting}
                  isRejecting={isRejecting}
                  acceptFriendRequestMutation={acceptFriendRequestMutation}
                  rejectRequestFriendMutation={rejectFriendRequestMutation}
                  setSelectedUserAcceptRequest={setSelectedUserAcceptRequest}
                  selectedUserAcceptRequest={selectedUserAcceptRequest}
                  setSelectedUserRejectRequest={setSelectedUserRejectRequest}
                  selectedUserRejectRequest={selectedUserRejectRequest}
                />
              ))}
            </div>
          </section>
        )}

        {/* Accepted Requests */}
        {isFriendRequestsLoading && <LoadingNotification />}

        {!isFriendRequestsLoading && acceptedRequests.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl flex items-center gap-2 font-[400]">
              <BellIcon className="size-5 text-primary animate-wiggle" />
              New Connections
            </h2>
            <div className="space-y-3">
              {acceptedRequests.map((notification) => (
                <AcceptedRequestCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          </section>
        )}

        {inComingRequests.length === 0 && acceptedRequests.length === 0 && (
          <NoNotificationsFound />
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
