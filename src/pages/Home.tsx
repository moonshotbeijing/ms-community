import { useEffect, useState } from "react";
import { fetchUserProfileById, fetchAllUserProfiles } from "../api";
import { ContactGrid, PageWrapper } from "../components";
import { useUserContext } from "../context";
import { UserProfile } from "../types";
import { validateUserProfile } from "../utils";

const Home = () => {
  const { user, signout } = useUserContext();
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (!user || !user.id) {
      return;
    }

    fetchUserProfileById(user.id).then((currentProfile) => {
      if (!validateUserProfile(currentProfile)) {
        window.location.href = "/onboarding";
      }
    });
  }, [user]);

  useEffect(() => {
    fetchAllUserProfiles().then((profiles) => setUserProfiles(profiles));
  }, []);

  return (
    <PageWrapper heading="Moonshot Directory">
      {fetchAllUserProfiles}
      <ContactGrid profiles={userProfiles} />

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
