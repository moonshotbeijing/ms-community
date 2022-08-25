import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useUserContext } from "./context";
import { Home, Login, Onboarding } from "./pages";

function AppRouter() {
  const { isAuthed, user } = useUserContext();

  if (!isAuthed || !user) {
    return <Login />;
  }

  return (
    <Router>
      <Switch>
        <Route path="/onboarding" component={Onboarding} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
