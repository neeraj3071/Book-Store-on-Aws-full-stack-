import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);  // Loading state
  const [success, setSuccess] = useState("");   // Success message state

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await axios.post(`http://44.200.206.221:8080/book/get`, { id });
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setCost(response.data.cost);
        setLoading(false);  // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching book data:", error);
        setError("Error fetching book details. Please try again.");
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

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

    const updatedBook = { id, title, author, cost: parseFloat(cost) };

    try {
      await axios.put(`http://localhost:8080/book`, updatedBook);
      setSuccess("Book details updated successfully!");
      setTimeout(() => navigate("/"), 2000);  // Redirect after success
    } catch (error) {
      console.error("Error updating book:", error);
      setError("Failed to update book. Please try again later.");
    }
  };

  // Show loading message or the form depending on the state
  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Book</h2>

          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Book Title</label>
              <input
                type="text"
                className={`form-control ${!title && error ? "is-invalid" : ""}`}
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
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
              {(!cost || isNaN(cost) || parseFloat(cost) <= 0) && error && (
                <div className="invalid-feedback">Please enter a valid positive number for the cost.</div>
              )}
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Update
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
