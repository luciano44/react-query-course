import { Suspense } from "react";
import JokeCard from "@/components/JokeCard";

const Jokes = async () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <JokeCard />
    </Suspense>
  );
};
export default Jokes;
