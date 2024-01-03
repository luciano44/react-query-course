import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = ({ queryKey }) => {
  const userId = queryKey[1];

  const usersAPI = `https://jsonplaceholder.typicode.com/users/${userId}`;
  return axios.get(usersAPI).then((res) => res.data);
};

const useUsersData = (userId = "") => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUsers,
  });
};
export default useUsersData;
