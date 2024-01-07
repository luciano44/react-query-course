"use client";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const MutationPage = () => {
  const [color, setColor] = useState("");
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["colors-mutation"],
    queryFn,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Use mutation response to append to the list
      queryClient.setQueryData(["colors-mutation"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });

      // Invalidates Query
      // queryClient.invalidateQueries(["colors-mutation"]);

      toast.success("Color successfully added");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function mutationFn(color) {
    if (!color) throw new Error("no color");

    const res = axios.post("http://localhost:3001/colors", {
      color,
    });
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
      {isPending && <p>Pending...</p>}

      <ul className="p-1">
        {data?.data &&
          data.data
            .map((c) => (
              <li
                key={c.id}
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
