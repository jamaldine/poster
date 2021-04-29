import React from "react";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import { Provider } from "react-redux";
import reducers from "./reducers";

import Authentification from "./HOC/auth/authentification";
import HomePage from "./scenes/homePage/HomePage";
import LoginPage from "./scenes/loginPage/LoginPage";
import RegisterPage from "./scenes/registerPage/RegisterPage";
import LogoutPage from "./scenes/logoutPage/LogoutPage";
import ProfilPage from "./scenes/profilPage/ProfilPage";
import DetailsPage from "./scenes/detailsPage/DetailsPage";

function App(props) {
  const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(
    createStore
  );
  return (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/details/:id"
            exact
            component={Authentification(DetailsPage, true)}
          />
          <Route
            path="/login"
            exact
            component={Authentification(LoginPage, false)}
          />
          <Route
            path="/register"
            exact
            component={Authentification(RegisterPage, false)}
          />
          <Route
            path="/logout"
            exact
            component={Authentification(LogoutPage, true)}
          />
          <Route
            path="/profil"
            exact
            component={Authentification(ProfilPage, true)}
          />
          <Route path="/" exact component={Authentification(HomePage, true)} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
