import { useEffect, useState } from "react";
import { fetchUserProfileById, fetchAllUserProfiles } from "../api";
import { ContactGrid, PageWrapper } from "../components";
import { useUserContext } from "../context";
import { UserProfile } from "../types";
import { validateUserProfile } from "../utils";

const Home = () => {
  const { user, userProfile } = useUserContext();
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
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
    <PageWrapper
      heading="Moonshot Directory"
      subheading={
        userProfile?.first_name
          ? `Welcome to the community, ${userProfile?.first_name}!`
          : undefined
      }
    >
      <ContactGrid profiles={userProfiles} />
    </PageWrapper>
  );
};

export default Home;
