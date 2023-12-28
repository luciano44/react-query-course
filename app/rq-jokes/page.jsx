import "./_css/page.scss";
const jokesURL = "https://official-joke-api.appspot.com/random_joke";

const RQJokes = () => {
  return (
    <div className="joke-card">
      <small>{"{joke.type}"}</small>
      <p>{"{joke.setup}"}</p>
      <p>{"{joke.punchline}"}</p>
    </div>
  );
};
export default RQJokes;
