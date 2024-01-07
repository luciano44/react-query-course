"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const MutationPage = () => {
  const [color, setColor] = useState("");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["colors"],
    queryFn,
  });
  const { mutate, isPending, status } = useMutation({ mutationFn });

  function mutationFn(color) {
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
      <button className="bg-slate-500 px-2" onClick={() => mutate(color)}>
        add
      </button>
      <ul>{data && data.data.map((c) => <p>{c.color}</p>).reverse()}</ul>
    </div>
  );
};
export default MutationPage;
