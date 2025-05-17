import { Link } from "react-router";
import {
  CheckCircle,
  MapPinIcon,
  ShipWheelIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { FriendsCard, LoadingUsers, NoFriendsFound } from "../components";
import { useState, useEffect } from "react";
import { capitalize } from "../lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOutgoingRequests,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { toast } from "react-toastify";
import { getLanguageFlag } from "../components/FriendsCard";
const HomePage = () => {
  const queryClient = useQueryClient();
  const [sendingRequestUserId, setSendingRequestUserId] = useState(null);
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set()); // to Store Specific Value;
  const [rejectedRequestIds, setRejectedRequestIds] = useState(new Set()); // to Store Rejected Request IDs

  //! get the Friends:
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  //! get the Recommended Users:
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["recommended-users"],
    queryFn: getRecommendedUsers,
  });

  //! get Outgoing Requests:
  const { data: outgoingFriendRequests } = useQuery({
    queryKey: ["outgoing-requests"],
    queryFn: getOutgoingRequests,
  });

  //! send Friend Request:
  const { mutate: sendRequestMutation, isPending: isSendingRequest } =
    useMutation({
      mutationFn: sendFriendRequest,
      onSuccess: () => {
        toast.success("Friend Request Sent Successfully");
        queryClient.invalidateQueries({ queryKey: ["outgoing-requests"] });
      },
    });
  //! useEffect to set the outgoingRequestsIds:
  useEffect(() => {
    const outgoingIds = new Set();
    const rejectedIds = new Set();
    if (outgoingFriendRequests && outgoingFriendRequests.length > 0) {
      outgoingFriendRequests.forEach((req) => {
        if (req.status === "rejected") {
          rejectedIds.add(req.recipient._id);
        } else {
          outgoingIds.add(req.recipient._id);
        }
      });
      setOutgoingRequestsIds(outgoingIds);
      setRejectedRequestIds(rejectedIds);
    }
  }, [outgoingFriendRequests]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-base-300 min-h-screen">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Your Friends
          </h2>
          <Link to={"/notifications"} className="btn btn-primary btn-sm">
            <UsersIcon className="w-4 h-4 mr-2" />
            <span>Friends Requests</span>
          </Link>
        </div>

        {/* Friends List */}
        {loadingFriends ? (
          <LoadingUsers />
        ) : friends.length === 0 ? (
          <NoFriendsFound
            title="No Friends Found"
            description="You have no friends yet, add some friends to your account."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendsCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
        <section className="h-full">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Meet New Learners
                </h2>
                <p className="opacity-70 mt-2">
                  Discover new friends who share your language learning journey.
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Friends List */}
          {loadingUsers ? (
            <LoadingUsers />
          ) : recommendedUsers.length === 0 ? (
            <NoFriendsFound
              title={"No Recommended Partners Found"}
              description={"Check back later for new language partners!"}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedUsers
                .filter((user) => !rejectedRequestIds.has(user._id))
                .map((user) => {
                  const hasSentRequest = outgoingRequestsIds.has(user._id);
                  const isSending = sendingRequestUserId === user._id;
                  return (
                    <div
                      key={user._id}
                      className="card  bg-base-100 hover:shadow-md border border-primary/30 cursor-pointer hover:shadow-primary transition-shadow"
                    >
                      <div className="card-body p-5 space-y-4">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          <div className="avatar size-16 rounded-full">
                            <img
                              src={user.profilePicture}
                              alt={user.fullName}
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center md:text-left">
                            <h3 className="font-[400] text-lg truncate">
                              {user.fullName}
                            </h3>
                            {user.location && (
                              <div className="flex items-center opacity-70 mt-2">
                                <MapPinIcon className="w-4 h-4 mr-1 text-primary" />
                                <span className="text-sm">{user.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Language With Flag */}
                        <div className="flex flex-col items-center gap-2">
                          <span className="badge badge-outline badge-lg badge-primary text-sm w-full ">
                            {getLanguageFlag(user.nativeLanguage)}
                            Native: {user.nativeLanguage}
                          </span>
                          <span className="badge  badge-primary badge-lg text-sm w-full">
                            {getLanguageFlag(user.learningLanguage)}
                            Learning: {capitalize(user.learningLanguage)}
                          </span>
                        </div>

                        {/* Bio */}
                        {user.bio && (
                          <p className="text-sm opacity-70">{user.bio}</p>
                        )}

                        {/* Button Actions */}
                        <button
                          className={`btn mt-2 ${
                            hasSentRequest ? "btn-disabled" : "btn-primary"
                          } btn-sm w-full`}
                          disabled={hasSentRequest || isSending}
                          onClick={() => {
                            setSendingRequestUserId(user._id);
                            try {
                              sendRequestMutation(user._id);
                            } finally {
                              setTimeout(() => {
                                setSendingRequestUserId(null);
                              }, 3000);
                            }
                          }}
                        >
                          {hasSentRequest ? (
                            <>
                              <CheckCircle className="size-4 mr-2" />
                              Request Sent
                            </>
                          ) : isSending ? (
                            <>
                              <span>Sending...</span>
                              <ShipWheelIcon className="size-4 ml-2 animate-spin text-yellow-500" />
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4 mr-2" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
