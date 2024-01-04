"use client";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./_css/page.scss";

function fetchJoke() {
  return axios
    .get("https://official-joke-api.appspot.com/random_joke")
    .then((res) => res.data);
}

function fetchTodo(id) {
  return axios
    .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((res) => res.data);
}

const DependendQueriesPage = () => {
  const {
    data: joke,
    isLoading: jokeIsLoading,
    isFetching: jokeIsFetching,
  } = useQuery({
    queryKey: ["joke"],
    queryFn: () => fetchJoke(),
  });

  const jokeId = Math.floor(joke?.id / 2);

  const [todoObj] = useQueries({
    queries: jokeId
      ? [
          {
            queryKey: ["todo", jokeId],
            queryFn: () => fetchTodo(jokeId),
          },
        ]
      : [],
  });

  return (
    <div className="dependent-queries">
      <p>
        Makes a request for a new Joke and grab its ID then make a request of a
        To-Do with the ID of the fetched Joke divided by 2{" "}
        {"(rounds number down if it's not an Integer.)"}.
      </p>

      <ul>
        {(todoObj?.isLoading || todoObj?.isFetching) && (
          <h1 className="loading">ToDo Loading...</h1>
        )}
        {joke && (
          <>
            <li className="id">{joke.id}</li>
            <li>{joke.setup}</li>
            <li>{joke.punchline}</li>
          </>
        )}
      </ul>

      <ul>
        {(jokeIsLoading || jokeIsFetching) && (
          <h1 className="loading">Joke Loading...</h1>
        )}
        {todoObj?.data && (
          <>
            <li className="id">{todoObj.data.id}</li>
            <li>{todoObj.data.userId}</li>
            <li>{todoObj.data.title}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DependendQueriesPage;
