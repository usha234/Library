import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';

function Bedit() {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/books/${id}`)
      .then((res) => {
        console.log("API Response:", res.data); 

        if (res.data && typeof res.data === 'object') {
          setData(res.data); 
        } else {
          setError("No data found for this ID");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
      })
      .finally(() => setLoading(false)); 
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/books/edit/${id}`, data)
      .then((res) => {
        console.log("Book updated successfully:", res);
        navigate("/books");
      })
      .catch((err) => console.error("Error updating book:", err));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>Edit Book {id}</h1>
      <Link to="/books" className="btn btn-success">
        Back
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            value={data.name || ''}
            type="text"
            name="name"
            required
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="author">Author</label>
          <input
            value={data.author || ''}
            type="text"
            name="author"
            required
            onChange={(e) => setData({ ...data, author: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="publish">Publication</label>
          <input
            value={data.publish || ''}
            type="text"
            name="publish"
            required
            onChange={(e) => setData({ ...data, publish: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="year">Year</label>
          <input
            value={data.year || ''}
            type="number"
            name="year"
            required
            onChange={(e) => setData({ ...data, year: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Bedit;
