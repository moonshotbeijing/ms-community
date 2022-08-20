import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../api";

type AuthState =
  | "SIGNED_IN"
  | "SIGNED_OUT"
  | "TOKEN_REFRESHED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "PASSWORD_RECOVERY";

type UserContextProps = {
  user: any | null;
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
  authState: null,
  isAuthed: false,
  signInWithGithub: async () => {},
  signout: async () => {},
});

const UserContextProvider: FunctionComponent<UserContextProviderProps> = ({
  children,
}) => {
  const user = supabase.auth.user();

  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(
    user !== null || authState === "SIGNED_IN"
  );

  supabase.auth.onAuthStateChange((event, _) => {
    setAuthState(event);
  });

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
