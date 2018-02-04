import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  state = { query: "", resultBooks: [] };

  updateQuery = event => {
    const query = event.target.value.trim();
    this.setState({ query });
    this.searchBooks(query);
  };

  searchBooks = query => {
    if (query) {
      BooksAPI.search(query).then(resultBooks => {
        //Update state only if query for which search was
        //performed is same as latest query in state
        if (this.state.query === query) {
          this.setState({ resultBooks });
          console.log(this.state.resultBooks);
        }
      });
    } else {
      this.setState({ resultBooks: [] });
    }
  };

  render() {
    console.log("search");
    const existingBooks = this.props.books;
    const updateBook = this.props.updateBook;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/karthikvrao/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.resultBooks.map(book => {
              const foundBook = existingBooks.find(
                existingBook => existingBook.id === book.id
              );
              let displayBook;
              if (foundBook) {
                displayBook = foundBook;
              } else {
                displayBook = book;
                displayBook.shelf = "none";
              }
              return (
                <li key={displayBook.id}>
                  <Book book={displayBook} updateBook={updateBook} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
