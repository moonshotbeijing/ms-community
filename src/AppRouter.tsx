import { useState } from "react";
import { supabase } from "./api";
import { Home, Login } from "./pages";

type AuthState =
  | "SIGNED_IN"
  | "SIGNED_OUT"
  | "TOKEN_REFRESHED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "PASSWORD_RECOVERY";

function AppRouter() {
  const user = supabase.auth.user();
  const [authState, setAuthState] = useState<AuthState | null>(null);

  supabase.auth.onAuthStateChange((event, _) => setAuthState(event));

  return <div>{user || authState === "SIGNED_IN" ? <Home /> : <Login />}</div>;
}

export default AppRouter;
