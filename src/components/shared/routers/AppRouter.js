import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import { ProfileGuard } from "../routeProtectors/ProfileGuard";
import { EditGuard } from "../routeProtectors/EditGuard";

import GameRouter from "./GameRouter";
import Login from "../../login/Login";
import Register from "../../login/Register";
import Profile from "../../game/Profile";
import Edit from "../../game/Edit";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
              exact
              path="/register"
              render={() => (
                <Register />
              )}
            />
            <Route
              exact
              path={"/users/:id"}
              render={() => (
                <ProfileGuard>
                  <Profile />
                </ProfileGuard>
            )}
            />
            <Route
              exact
              path={"/edit/:id"}
              render={() => (
                <EditGuard>
                  <Edit />
                </EditGuard>
              )}
            />
            <Route path="/" exact render={() => <Redirect to={"/register"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
