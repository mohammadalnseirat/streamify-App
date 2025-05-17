import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectFriendRequest } from "../lib/api";
import { toast } from "react-toastify";

const useReject = () => {
  const queryClient = useQueryClient();
  const { mutate: rejectFriendRequestMutation, isPending: isRejecting } =
    useMutation({
      mutationFn: rejectFriendRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["friendsRequests"] });
        queryClient.invalidateQueries({ queryKey: ["recommended-users"] });
        toast.success("Friend request rejected successfully");
      },
      onError: (error) => {
        toast.error(error.response.data.message || "Something went wrong");
      },
    });
  return { rejectFriendRequestMutation, isRejecting };
};

export default useReject;
