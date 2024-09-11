import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';

function Ledit() {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/library/${id}`) 
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
    console.log("Submitting data:", data);

    axios
      .post(`/library/edit/${id}`, data)  
      .then((res) => {
        console.log("Library entry updated successfully:", res);
        navigate("/library");
      })
      .catch((err) => console.error("Error updating library entry:", err));
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
      <h1>Edit Library Entry {id}</h1>
      <Link to="/library" className="btn btn-success">
        Back
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="sname">Student Name</label>
          <input
            value={data.sname || ''}
            type="text"
            name="sname"
            required
            onChange={(e) => setData({ ...data, sname: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="bname">Book Name</label>
          <input
            value={data.bname || ''}
            type="text"
            name="bname"
            required
            onChange={(e) => setData({ ...data, bname: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="sd">Start Date</label>
          <input
            value={data.sd || ''}
            type="date"
            name="sd"
            required
            onChange={(e) => setData({ ...data, sd: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="ld">Last Date</label>
          <input
            value={data.ld || ''}
            type="date"
            name="ld"
            required
            onChange={(e) => setData({ ...data, ld: e.target.value })}
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

export default Ledit;
