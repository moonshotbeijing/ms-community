import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchUserProfileById, supabase } from "../api";
import { UserProfile } from "../types";

type AuthState =
  | "SIGNED_IN"
  | "SIGNED_OUT"
  | "TOKEN_REFRESHED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "PASSWORD_RECOVERY";

type UserContextProps = {
  user: any | null;
  userProfile: UserProfile | null;
  authState: AuthState | null;
  isAuthed: boolean;
  signInWithGithub: () => Promise<void>;
  signout: () => Promise<void>;
};

type UserContextProviderProps = {
  children: any;
};

const UserContext = createContext<UserContextProps>({
  user: null,
  userProfile: null,
  authState: null,
  isAuthed: false,
  signInWithGithub: async () => {},
  signout: async () => {},
});

const UserContextProvider: FunctionComponent<UserContextProviderProps> = ({
  children,
}) => {
  const user = supabase.auth.user();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(
    user !== null || authState === "SIGNED_IN"
  );

  supabase.auth.onAuthStateChange((event, _) => {
    setAuthState(event);
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    fetchUserProfileById(user.id).then((profile) => {
      setUserProfile(profile);
    });
  }, [user]);

  useEffect(() => {
    setIsAuthed(user !== null || authState === "SIGNED_IN");
  }, [user, authState]);

  async function signInWithGithub() {
    await supabase.auth.signIn({
      provider: "github",
    });
  }

  async function signout() {
    await supabase.auth.signOut();
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userProfile,
        authState,
        isAuthed,
        signInWithGithub,
        signout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUserContext() {
  return useContext(UserContext);
}

export { UserContext, UserContextProvider, useUserContext };
