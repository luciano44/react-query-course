import { Suspense } from "react";
import JokeCard from "@/components/JokeCard";

const jokesURL = "https://official-joke-api.appspot.com/random_joke";

const Jokes = async () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <JokeCard />
    </Suspense>
  );
};
export default Jokes;
