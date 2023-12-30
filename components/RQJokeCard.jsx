"use client";
import axios from "axios";
import "./_css/JokeCard.scss";
import { useQuery } from "@tanstack/react-query";

const jokesURL = "https://official-joke-api.appspot.com/random_ten";

function fetchJoke() {
  return axios.get(jokesURL).then((res) => res.data);
}

const RQJokeCard = () => {
  const { isError, error, isLoading, data, isFetching } = useQuery({
    queryKey: ["joke"],
    queryFn: () => fetchJoke(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1 className="error-msg">{error.message}</h1>;

  return (
    <>
      {isFetching && <h1>Fetching...</h1>}
      {data.map((joke) => {
        return (
          <div className="joke-card" key={joke.id}>
            <small>{joke.type}</small>
            <p>{joke.setup}</p>
            <p className="punchline">{joke.punchline}</p>
          </div>
        );
      })}
    </>
  );
};
export default RQJokeCard;
