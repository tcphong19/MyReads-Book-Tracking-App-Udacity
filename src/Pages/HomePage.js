import React from "react";
import BookShelf from "../Components/BookShelf";

//Home page
export default function HomePage() {
  return (
    <div className="list-books">
      <div className="list-books-title">
        {/* Title of react app */}
        <h1>MyReads - A Book Tracking App</h1>
      </div>
      <BookShelf />
    </div>
  );
}
