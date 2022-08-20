import { useCallback, useEffect } from "react";
import { supabase } from "../api";
import { useUserContext } from "../context";
import { ContactGrid, PageWrapper } from "../components";

const Home = () => {
  const { user, signout } = useUserContext();

  const fetchCurrentUserProfile = useCallback(async () => {
    if (!user) return null;

    const { data: profiles } = await supabase
      .from("profiles")
      .select()
      .eq("user_id", user.id);

    if (!profiles || profiles.length < 1) return null;
    return profiles[0];
  }, [user]);

  const createUserProfile = useCallback(async () => {
    const { full_name, email, avatar_url, user_name } = user.user_metadata;

    await supabase.from("profiles").insert([
      {
        user_id: user.id,
        full_name,
        email,
        avatar_url,
        github_username: user_name,
      },
    ]);
  }, [user]);

  const createUserProfileIfNoneFound = useCallback(async () => {
    const currentProfile = await fetchCurrentUserProfile();

    if (currentProfile) {
      return;
    }

    createUserProfile();
  }, [createUserProfile, fetchCurrentUserProfile]);

  useEffect(() => {
    createUserProfileIfNoneFound();
  }, [createUserProfileIfNoneFound]);

  return (
    <PageWrapper heading="Moonshot Directory">
      <ContactGrid />
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
    </PageWrapper>
  );
};

export default Home;
