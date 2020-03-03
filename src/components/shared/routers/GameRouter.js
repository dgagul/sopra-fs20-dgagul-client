import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Game from "../../game/Game";


class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/game" because as been passed as a prop in the parent of GameRouter, i.e., AppRouter.js
     */
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={`${this.props.base}/dashboard`}
            render={() => <Game />}
          />
          <Route
            exact
            path={`${this.props.base}`}
            render={() => <Redirect to={`${this.props.base}/dashboard`} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
