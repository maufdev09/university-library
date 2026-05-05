import { Book } from "@/type";
import React from "react";

const BookList = ({
  books,
  title,
  containerClassName,
}: {
  books: Book[];
  title: string;
  containerClassName: string;
}) => {
  return (
    <div className={containerClassName}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-sm text-gray-500">{book.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
