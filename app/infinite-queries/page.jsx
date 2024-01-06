"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import axios from "axios";
import "./_css/page.scss";

function fetchColors({ pageParam = 1 }) {
  return axios
    .get(`http://localhost:3001/colors?_limit=3&_page=${pageParam}`)
    .then((res) => res.data);
}

const InfiniteQueriesPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (_lastPage, pages) => {
      return pages.length < 10 ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    function handleClick(e) {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      console.log({
        scrollY,
        innerHeight,
        scrollHeight,
      });

      if (scrollY + innerHeight == scrollHeight) fetchNextPage();
    }

    window.addEventListener("scroll", handleClick);

    return () => {
      // 👇️ remove event listener when the component unmounts
      window.removeEventListener("scroll", handleClick);
    };
  }, []);

  console.log(data);

  if (isLoading) return <p>Loading Infinite Query...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="infinite-queries">
      <ul>
        {data &&
          data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.map((color) => (
                <li
                  key={color.id}
                  className="hover:bg-slate-800 p-5 rounded-md select-none"
                  style={{ border: `3px solid ${color.color}` }}
                >
                  <p
                    style={{
                      fontWeight: "bolder",
                      textShadow: "0 0 5px black",
                    }}
                  >
                    <span className="opacity-50 mr-3">{color.id}</span>
                    {color.color}
                  </p>
                </li>
              ))}
            </Fragment>
          ))}
        {isFetchingNextPage && (
          <p className="text-3xl text-center">Fetching...</p>
        )}
      </ul>
      <button
        className="bg-slate-700 py-1 px-2 rounded-md"
        onClick={fetchNextPage}
        disabled={!hasNextPage}
      >
        See more
      </button>
    </div>
  );
};
export default InfiniteQueriesPage;
