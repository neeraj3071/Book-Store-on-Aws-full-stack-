import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const result = await axios.get("http://44.200.206.221:8080/books");
      setBooks(result.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://44.200.206.221:8080/book/${id}`);
      loadBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Cost</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.cost}</td>
                  <td>
                    <Link className="btn btn-primary mx-2" to={`/viewbook/${book.id}`}>
                      View
                    </Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/editbook/${book.id}`}>
                      Edit
                    </Link>
                    <button className="btn btn-danger mx-2" onClick={() => deleteBook(book.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
