"use client";
import useJokesData from "@/hooks/useJokesData";
import "./_css/JokeCard.scss";
import "@/hooks/useJokesData";
import { MdOutlineRefresh } from "react-icons/md";

const JokeCardRefetch = () => {
  const { data, refetch, isFetching, isSuccess } = useJokesData(false, false);

  return (
    <>
      <button onClick={refetch} disabled={isFetching}>
        <MdOutlineRefresh />
      </button>
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
        <h1>No Data Available 😔</h1>
      )}
    </>
  );
};
export default JokeCardRefetch;
