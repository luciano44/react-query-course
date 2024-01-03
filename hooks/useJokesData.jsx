import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const jokesURL = "https://official-joke-api.appspot.com/random_ten";

function fetchJoke(url = jokesURL) {
  return axios.get(url).then((res) => res.data);
}

const useJokesData = (select, enabled = true, url) => {
  return useQuery({
    queryKey: ["jokes"],
    queryFn: () => fetchJoke(url),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,
    gcTime: 3000,
    select,
  });
};
export default useJokesData;
