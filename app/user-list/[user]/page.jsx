"use client";
import useJokesData from "@/hooks/useJokesData";
import Link from "next/link";
import "./_css/page.scss";

const UserListPage = ({ params }) => {
  const usersAPI = `https://jsonplaceholder.typicode.com/users/${params.user}`;

  const { data: user, isLoading } = useJokesData(
    false,
    true,
    usersAPI,
    `user${params.user}`
  );

  console.log(user);

  if (isLoading) return <h1>Loading User...</h1>;

  return (
    <>
      {user && (
        <div className="user-card">
          <small>{user.id}</small>
          <h1 className="text-2xl">{user.name}</h1>
          <p>{user.username}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
        </div>
      )}
    </>
  );
};
export default UserListPage;
