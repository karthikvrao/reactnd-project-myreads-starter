import React, { Component } from "react";
// import * as BooksAPI from './BooksAPI'
import { Route, Link } from "react-router-dom";
import "./App.css";
import SearchBooks from "./SearchBooks";
import ListShelves from "./ListShelves";

class BooksApp extends Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListShelves />} />
        <Route path="/search" render={() => <SearchBooks />} />
      </div>
    );
  }
}

export default BooksApp;
