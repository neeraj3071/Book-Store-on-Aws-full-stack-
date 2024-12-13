import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !author || !cost) {
      setError("All fields are required!");
      return;
    }

    if (isNaN(cost) || parseFloat(cost) <= 0) {
      setError("Cost must be a positive number!");
      return;
    }

    const book = { title, author, cost: parseFloat(cost) };

    try {
      setLoading(true); // Start loading
      await axios.post("http://44.200.206.221:8080/book", book);
      setLoading(false); // Stop loading
      navigate("/"); // Redirect to homepage after success
    } catch (err) {
      setLoading(false); // Stop loading
      console.error("Error adding book:", err);
      setError("Failed to add book. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Book</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Book Title</label>
              <input
                type="text"
                className={`form-control ${!title && error ? "is-invalid" : ""}`}
                placeholder="Enter Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {!title && error && <div className="invalid-feedback">Please enter a book title.</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                className={`form-control ${!author && error ? "is-invalid" : ""}`}
                placeholder="Enter Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              {!author && error && <div className="invalid-feedback">Please enter the author's name.</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Cost</label>
              <input
                type="text"
                className={`form-control ${(!cost || isNaN(cost) || parseFloat(cost) <= 0) && error ? "is-invalid" : ""}`}
                placeholder="Enter Book Cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
              {(!cost || isNaN(cost) || parseFloat(cost) <= 0) && error && (
                <div className="invalid-feedback">Please enter a valid positive number for the cost.</div>
              )}
            </div>

            <button type="submit" className="btn btn-outline-primary" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-danger mx-2"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
