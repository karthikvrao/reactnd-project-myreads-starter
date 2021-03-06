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

  updateBook = (updatedBook, shelf) => {
    // Remove book from books if shelf is set to none,
    // else update book's new shelf in books
    if (shelf === "none") {
      this.setState(prevState => ({
        books: prevState.books.filter(book => book.id !== updatedBook.id)
      }));
    } else {
      let newBook = true;
      this.setState(prevState => {
        let books = prevState.books.map(book => {
          if (book.id === updatedBook.id) {
            book.shelf = shelf;
            newBook = false;
          }
          return book;
        });
        if (newBook) {
          updatedBook.shelf = shelf;
          books.push(updatedBook);
        }
        return { books };
      });
    }

    BooksAPI.update(updatedBook, shelf);
  };

  render() {
    const shelves = ["currentlyReading", "wantToRead", "read"];
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListShelves
              books={this.state.books}
              updateBook={this.updateBook}
              shelves={shelves}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.books}
              updateBook={this.updateBook}
              shelves={shelves}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
