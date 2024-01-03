"use client";
import "./_css/page.scss";
import useUsersData from "@/hooks/useUsersData";

const UserListPage = ({ params }) => {
  const { data: user, isLoading } = useUsersData(params.user);

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
