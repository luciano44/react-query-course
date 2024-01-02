import { Suspense } from "react";
import JokeCard from "@/components/JokeCard";

const jokesURL = "https://official-joke-api.appspot.com/random_joke";

const Jokes = async () => {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "25px auto",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        <JokeCard />
      </Suspense>
    </div>
  );
};
export default Jokes;