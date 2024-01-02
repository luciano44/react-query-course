import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const jokesURL = "https://official-joke-api.appspot.com/random_ten";

function fetchJoke(url = jokesURL) {
  return axios.get(url).then((res) => res.data);
}

const useJokesData = (select, enabled = true, url, queryKey = "joke") => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchJoke(url),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,
    gcTime: 3000,
    select,
  });
};
export default useJokesData;
