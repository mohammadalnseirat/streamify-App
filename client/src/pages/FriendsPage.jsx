import React from "react";
import useFriends from "../hooks/useFriends";
// import { FriendsCard, LoadingUsers, NoFriendsFound } from "../components";
import { Link } from "react-router";
import { UsersIcon } from "lucide-react";
import NoFriendsFound from "../components/NoFriendsFound";
import LoadingUsers from "../components/LoadingUsers";
import FriendsCard from "../components/FriendsCard";

const FriendsPage = () => {
  const { friends, loadingFriends } = useFriends();
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-base-300 min-h-screen">
    <div className="container mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Your Friends
        </h2>
        <Link to={"/notifications"} className="btn btn-primary btn-sm">
          <UsersIcon className="w-4 h-4 mr-2" />
          <span>Friends Requests</span>
        </Link>
      </div>

      {loadingFriends ? (
        <LoadingUsers />
      ) : friends.length === 0 ? (
        <NoFriendsFound
          title="No Friends Found"
          description="You have no friends yet, add some friends to your account."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendsCard key={friend._id} friend={friend} />
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
