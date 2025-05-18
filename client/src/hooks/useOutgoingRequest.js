import { useQuery } from "@tanstack/react-query";
import { getOutgoingRequests } from "../lib/api";

const useOutgoingRequest = () => {
  const { data: outgoingFriendRequests } = useQuery({
    queryKey: ["outgoing-requests"],
    queryFn: getOutgoingRequests,
  });
  return { outgoingFriendRequests };
};

export default useOutgoingRequest;
