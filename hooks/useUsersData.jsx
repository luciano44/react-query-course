import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = ({ queryKey }) => {
  const userId = queryKey[1] || "";

  const usersAPI = `https://jsonplaceholder.typicode.com/users/${userId}`;
  return axios.get(usersAPI).then((res) => res.data);
};

const useUsersData = (userId = "") => {
  const queryClient = useQueryClient();

  const queryKeyArray = !userId ? ["users"] : ["user", userId];

  return useQuery({
    queryKey: queryKeyArray,
    queryFn: fetchUsers,
    initialData: () => {
      return queryClient
        .getQueryData(["users"])
        ?.find((user) => user.id == parseInt(userId));
    },
  });
};
export default useUsersData;
