import { useEffect } from "react";
import { useUserContext } from "../context";

const Home = () => {
  const { user, signout } = useUserContext();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to Moonshot Factory
      </h1>
      <p>You are now logged in.</p>

      <img
        src={user?.user_metadata.avatar_url}
        alt="Profile"
        className="rounded-full h-8 w-8"
      />
      <p>{user?.user_metadata.name}</p>

      <button
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={signout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
