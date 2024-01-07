"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const MutationPage = () => {
  const [color, setColor] = useState("");
  const { data, isLoading, refetch, error, isError } = useQuery({
    queryKey: ["colors-mutation"],
    queryFn,
  });
  const { mutate, isPending, status } = useMutation({ mutationFn });

  function mutationFn(color) {
    if (!color) return alert("please insert color name");

    const res = axios.post("http://localhost:3001/colors", {
      color,
    });
    refetch();
    setColor("");
    return res;
  }

  function queryFn() {
    return axios.get("http://localhost:3001/colors");
  }

  return (
    <div>
      <input
        type="text"
        name="color"
        className="text-slate-950 px-2"
        onChange={(e) => {
          setColor(e.target.value);
        }}
        value={color}
        onKeyDown={(e) => {
          if (e.key === "Enter") mutate(color);
        }}
      />
      {isLoading && <p>Loading Colors...</p>}
      {isError && <p>{error.message}</p>}
      <button className="bg-slate-500 px-2" onClick={() => mutate(color)}>
        add
      </button>
      <ul className="p-1">
        {data?.data &&
          data.data
            .map((c) => (
              <li
                style={{ color: c.color }}
                className="mb-1 bg-slate-800 rounded-md p-1 "
              >
                {c.color}
              </li>
            ))
            .reverse()}
      </ul>
    </div>
  );
};
export default MutationPage;
