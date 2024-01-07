"use client";
import { request } from "@/utils/axios-utils";
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

  function mutationFn(color) {
    if (!color) throw new Error("no color");

    // axios.post("http://localhost:3001/colors", {
    //   color,
    // });
    const res = request({ url: "/colors", method: "post", data: { color } });
    setColor("");
    return res;
  }

  function queryFn() {
    return request({ url: "/colors" });
  }

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Use mutation response to append to the list
      // queryClient.setQueryData(["colors-mutation"], (oldQueryData) => {
      //   return {
      //     ...oldQueryData,
      //     data: [...oldQueryData.data, data.data],
      //   };
      // });

      // Invalidates Query
      // queryClient.invalidateQueries(["colors-mutation"]);

      toast.success("Color successfully added");
    },
    onMutate: async (color) => {
      await queryClient.cancelQueries(["colors-mutation"]);
      const previousQueryData = queryClient.getQueryData(["colors-mutation"]);
      queryClient.setQueriesData(["colors-mutation"], () => {
        return {
          ...previousQueryData,
          data: [
            ...previousQueryData.data,
            {
              id: previousQueryData?.data.length + 1 || 1,
              color,
            },
          ],
        };
      });
      return {
        previousQueryData,
      };
    },
    onError: (_error, _color, context) => {
      queryClient.setQueryData(
        ["colors-mutation"],
        () => context.previousQueryData
      );
      toast.error("Something went wrong");
    },
    onSettled: () => {
      // queryClient.invalidateQueries(["colors-mutation"]);
    },
  });

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
        disabled={isPending}
      />
      {isLoading && <p>Loading Colors...</p>}
      {isError && <p>{error.message}</p>}
      <button
        className="bg-slate-500 px-2"
        onClick={() => mutate(color)}
        disabled={isPending}
      >
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
