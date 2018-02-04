import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";

class ListShelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  };
  render() {
    const { books, updateBook, shelves } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf, index) => {
              return (
                <div key={index} className="bookshelf">
                  <h2 className="bookshelf-title">
                    {shelf === "currentlyReading"
                      ? "Currently Reading"
                      : shelf === "wantToRead" ? "Want to Read" : "Read"}
                  </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter(book => book.shelf === shelf).map(book => (
                        <li key={book.id}>
                          <Book
                            book={book}
                            updateBook={updateBook}
                            shelves={shelves}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Search book</Link>
        </div>
      </div>
    );
  }
}

export default ListShelves;
