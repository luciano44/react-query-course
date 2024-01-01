"use client";
import axios from "axios";
import "./_css/JokeCard.scss";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineRefresh } from "react-icons/md";
import toast from "react-hot-toast";
import { useEffect } from "react";

const jokesURL = "https://official-joke-api.appspot.com/random_ten";

function fetchJoke() {
  return axios.get(jokesURL).then((res) => res.data);
}

const select = (data) =>
  data.map((joke) => ({
    id: joke.id,
    setup: joke.setup,
    punchline: joke.punchline,
  }));

const RQJokeCard = () => {
  const { isError, error, isSuccess, isLoading, data, isFetching, refetch } =
    useQuery({
      queryKey: ["joke"],
      queryFn: () => fetchJoke(),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: false,
      gcTime: 0,
      select,
    });

  useEffect(() => {
    if (isSuccess) toast.success("Data fetched successfuly");
    if (isError) toast.error("Data not fetched");
    console.log(data);
  }, [data, isSuccess, isError]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1 className="error-msg">{error.message}</h1>;

  return (
    <>
      <button onClick={refetch} disabled={isFetching}>
        <MdOutlineRefresh />
      </button>
      {isFetching && <h1>Fetching, please wait...</h1>}
      {data ? (
        data.map((joke) => {
          return (
            <div className="joke-card" key={joke.id}>
              <p>{joke.setup}</p>
              <p className="punchline">{joke.punchline}</p>
            </div>
          );
        })
      ) : (
        <>
          <h1>No Data Available 😔</h1>
        </>
      )}
    </>
  );
};
export default RQJokeCard;
