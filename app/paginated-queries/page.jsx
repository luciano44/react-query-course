"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import "./_css/page.scss";

function fetchColors(pageNumber) {
  const ITEMS_PER_PAGE = 3;
  return axios
    .get(
      `http://localhost:3001/colors?_limit=${ITEMS_PER_PAGE}&_page=${pageNumber}`
    )
    .then((res) => res.data);
}

const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: colors,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  if (isLoading) return <p>Loading Infinite Query...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <ul>
        <p>Page {pageNumber}</p>
        <div className="buttons">
          <button
            onClick={() => setPageNumber((v) => v - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setPageNumber((v) => v + 1)}
            disabled={pageNumber === 10}
          >
            Next
          </button>
        </div>

        {colors &&
          colors.map((color) => (
            <li
              key={color.id}
              className="hover:bg-slate-800 p-2 rounded-md select-none"
            >
              <p>
                <span className="opacity-50 mr-3">{color.id}</span>
                {color.color}
              </p>
            </li>
          ))}
      </ul>
      {isFetching && <p>Retrieving new page data</p>}
    </>
  );
};
export default PaginatedQueriesPage;
