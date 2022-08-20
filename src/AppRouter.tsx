import { useUserContext } from "./context";
import { Home, Login } from "./pages";

function AppRouter() {
  const { isAuthed } = useUserContext();

  return <div>{isAuthed ? <Home /> : <Login />}</div>;
}

export default AppRouter;
