
import { useQuery } from '@tanstack/react-query';
import { getRecommendedUsers } from '../lib/api';

const useRecommendedUser = () => {
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["recommended-users"],
    queryFn: getRecommendedUsers,
  });
  return { recommendedUsers, loadingUsers };
}

export default useRecommendedUser