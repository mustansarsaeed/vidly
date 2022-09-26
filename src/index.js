import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "./App";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div>
      <NavBar />
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={App} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/" exact component={App} />
        <Route path="/not-found" component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);
