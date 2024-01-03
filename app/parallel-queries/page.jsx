"use client";
import useJokesData from "@/hooks/useJokesData";
import useUsersData from "@/hooks/useUsersData";
import "./_css/page.scss";

const ParallelQueries = () => {
  const { data: jokes, isLoading: isJokesLoading } = useJokesData();
  const { data: users, isLoading: isUsersLoading } = useUsersData();

  console.log({ jokes, users });

  const userList = users?.map((u) => <li>{u.name}</li>);
  const jokeList = jokes?.map((j) => <li>{j.setup}</li>);

  return (
    <div>
      <ul>{isUsersLoading ? <h1>Users Loading...</h1> : userList}</ul>
      <ul>{isJokesLoading ? <h1>Jokes Loading...</h1> : jokeList}</ul>
    </div>
  );
};
export default ParallelQueries;
