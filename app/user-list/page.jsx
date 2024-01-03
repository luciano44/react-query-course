"use client";
import Link from "next/link";
import "./_css/page.scss";
import useUsersData from "@/hooks/useUsersData";

const usersAPI = "https://jsonplaceholder.typicode.com/users";

const UserListPage = () => {
  const { data: users, isLoading } = useUsersData();

  console.log(users);

  if (isLoading) return <h1>Loading All Users...</h1>;

  return (
    <ul>
      {users &&
        users.map((user) => {
          return (
            <Link key={user.id} href={`user-list/${user.id}`}>
              <li>{user.name}</li>
            </Link>
          );
        })}
    </ul>
  );
};
export default UserListPage;
