import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import ShelfSection from "./Shelf";
import AddBook from "./AddBook";

const Shelf = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const handleShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      setBooks((prevBooks) =>
        prevBooks.filter((b) => b.id !== book.id).concat([book])
      );
    });
  };

  //Book shelf titles
  const compartments = [
    { type: "currentlyReading", title: "Currently Reading" },
    { type: "wantToRead", title: "Want To Read" },
    { type: "read", title: "Read" },
  ];

  return (
    <div>
      <div className="list-books-content">
        {books.length > 0 && (
          <div>
            {compartments.map((compartment, index) => {
              const compartmentBooks = books.filter(
                (book) => book.shelf === compartment.type
              );
              return (
                <div className="bookshelf" key={index}>
                  <h2 className="bookshelf-title">{compartment.title}</h2>
                  <ShelfSection
                    key={index}
                    books={compartmentBooks}
                    compartmentsList={compartments}
                    shelfChange={handleShelfChange}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <AddBook currentBooks={books} />
    </div>
  );
};

export default Shelf;
