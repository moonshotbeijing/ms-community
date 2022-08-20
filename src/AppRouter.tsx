import { useUserContext } from "./context";
import { Home, Login } from "./pages";
import { PageWrapper } from "./components";

function AppRouter() {
  const { isAuthed } = useUserContext();

  return (
    <div>
      {isAuthed ? (
        <PageWrapper>
          <Home />
        </PageWrapper>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default AppRouter;
