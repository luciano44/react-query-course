import axios from "axios";
import "./_css/JokeCard.scss";

const jokesURL = "https://official-joke-api.appspot.com/random_joke";

const JokeCard = async () => {
  const res = await axios.get(jokesURL);
  const { data: joke } = res;

  console.log("Joke Card");

  return (
    <div className="joke-card">
      <small>{joke.type}</small>
      <p>{joke.setup}</p>
      <p>{joke.punchline}</p>
    </div>
  );
};
export default JokeCard;
