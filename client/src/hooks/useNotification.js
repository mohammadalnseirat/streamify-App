import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFriendRequests } from "../lib/api";


const useNotification = () => {
  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading: isFriendRequestsLoading } = useQuery(
    {
      queryKey: ["friendsRequests"],
      queryFn: getFriendRequests,
    }
  );

  const inComingRequests = friendRequests?.incomingFriendRequests || [];
  const acceptedRequests = friendRequests?.acceptedFriendRequests || [];

  return { inComingRequests, acceptedRequests, isFriendRequestsLoading };
};

export default useNotification;
