import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const jokesURL = "https://official-joke-api.appspot.com/random_ten";

function fetchJoke() {
  return axios.get(jokesURL).then((res) => res.data);
}

const useJokesData = (select, enabled = true) => {
  return useQuery({
    queryKey: ["joke"],
    queryFn: () => fetchJoke(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,
    gcTime: 3000,
    select,
  });
};
export default useJokesData;
