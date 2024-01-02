import JokeCardRefetch from "@/components/JokeCardRefetch";

const JokeCardRefetchPage = () => {
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
      <JokeCardRefetch />
    </div>
  );
};
export default JokeCardRefetchPage;
