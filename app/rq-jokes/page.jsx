import RQJokeCard from "@/components/RQJokeCard";

const RQJokes = () => {
  return (
    <div
      style={{
        width: "400px",
        margin: "25px auto",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        placeItems: "center",
      }}
    >
      <RQJokeCard />
    </div>
  );
};
export default RQJokes;
