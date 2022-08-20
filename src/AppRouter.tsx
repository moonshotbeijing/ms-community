import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useUserContext } from "./context";
import { Home, Login } from "./pages";

function AppRouter() {
  const { isAuthed } = useUserContext();

  if (!isAuthed) {
    return <Login />;
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
