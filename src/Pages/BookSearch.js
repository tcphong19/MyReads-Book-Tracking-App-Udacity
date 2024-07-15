import React, { useState, useEffect } from "react";
import Book from "../Components/Book";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

export default function BookSearch({ location }) {
  const [books, setBooks] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [noBookFound, setNoBookFound] = useState(false);

  useEffect(() => {
    setBooks(location.state.booksFromHome);
  }, [location.state.booksFromHome]);

  const handleChooseBookShelf = (books, searchResult) => {
    if (books && searchResult) {
      books.forEach((book) => {
        searchResult.forEach((searchResultBook) => {
          if (book.id === searchResultBook.id) {
            searchResultBook.shelf = book.shelf;
          }
        });
      });
      setSearchResult(searchResult);
    }
  };

  const handleSearchBooks = (e) => {
    const searchInput = e.target.value;

    BooksAPI.search(searchInput).then((resultBooks) => {
      if (!resultBooks || resultBooks.hasOwnProperty("error")) {
        setSearchResult([]);
        setNoBookFound(true);
      } else {
        setSearchResult(resultBooks);
        setNoBookFound(false);
        handleChooseBookShelf();
      }
    });
  };

  const handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then((result) => {
      book.shelf = shelf;
      var updatedBooks = books.filter(
        (resultBook) => resultBook.id !== book.id
      );
      updatedBooks.push(book);
      setBooks(updatedBooks);
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={handleSearchBooks}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchResult.length > 0 && (
          <div>
            <div>
              <h3> {searchResult.length} books found!</h3>
            </div>
            <ol className="books-grid">
              {searchResult.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  shelfChange={handleShelfChange}
                />
              ))}
            </ol>
          </div>
        )}
        {noBookFound && (
          <div>
            <h3>No book found. Please try again !</h3>
          </div>
        )}
      </div>
    </div>
  );
}
