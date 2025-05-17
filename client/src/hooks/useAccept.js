import { useMutation, useQueryClient } from "@tanstack/react-query"
import { acceptFriendRequest } from "../lib/api";
import { toast } from "react-toastify";


const useAccept = () => {
  const queryClient = useQueryClient();
const { mutate: acceptFriendRequestMutation, isPending: isAccepting } =
  useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendsRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast.success("Friend request accepted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { acceptFriendRequestMutation, isAccepting };
};

export default useAccept