import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  };
  render() {
    const { book, updateBook, shelves } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf}
              onChange={e => updateBook(book, e.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              {shelves.map((shelf, index) => (
                <option value={shelf}>
                  {shelf === "currentlyReading"
                    ? "Currently Reading"
                    : shelf === "wantToRead" ? "Want to Read" : "Read"}
                </option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
        <div className="book-page-count">{book.pageCount} pages</div>
      </div>
    );
  }
}

export default Book;
