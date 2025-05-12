import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { toast } from "react-toastify";


const useLogout = () => {
  const queryClient = useQueryClient();
  
  const { mutate: logoutUserMutation, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("User Logged out successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  return { logoutUserMutation, isPending };
};

export default useLogout