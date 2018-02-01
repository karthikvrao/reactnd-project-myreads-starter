import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import "./App.css";
import SearchBooks from "./SearchBooks";
import ListShelves from "./ListShelves";

class BooksApp extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    // Get all books and update state
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <ListShelves books={this.state.books} />}
        />
        <Route path="/search" render={() => <SearchBooks />} />
      </div>
    );
  }
}

export default BooksApp;
