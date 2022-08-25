import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useUserContext } from "../context";
import { Login } from "../pages";
import { routes } from "./constants";

function AppRouter() {
  const { isAuthed, user } = useUserContext();

  if (!isAuthed || !user) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Switch>
        {routes.map((value) => {
          const exact = value.path === "/";
          return (
            <Route
              key={value.path}
              exact={exact}
              path={value.path}
              component={value.component}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
