import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';

function Edit() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        console.log("API Response:", res.data);

        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data[0]);
        } else if (res.data && typeof res.data === 'object') {
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
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('clas', data.clas);
    if (data.image && typeof data.image !== 'string') {
      formData.append('image', data.image);
    }
    if (data.video && typeof data.video !== 'string') {
      formData.append('video', data.video);
    }

    axios
      .post(`/edit_user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log("User updated successfully:", res);
        navigate("/students");
      })
      .catch((err) => console.error("Error updating user:", err));
  }

  function handleFileChange(e) {
    const { name, files } = e.target;
    setData({ ...data, [name]: files[0] });
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
      <h1>Edit Student {id}</h1>
      <Link to="/students" className="btn btn-success">
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
          <label htmlFor="clas">class</label>
          <input
            value={data.clas|| ''}
            type="text"
            name="clas"
            required
            onChange={(e) => setData({ ...data, clas: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {data.image && typeof data.image === 'string' && (
            <div>
              <p>Current Image:</p>
              <img src={`/uploads/${data.image}`} alt="Current" style={{ width: '100px' }} />
            </div>
          )}
        </div>
        <div className="form-group my-3">
          <label htmlFor="video">Upload Video</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
          />
          {data.video && typeof data.video === 'string' && (
            <div>
              <p>Current Video:</p>
              <video controls style={{ width: '200px' }}>
                <source src={`/uploads/${data.video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
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

export default Edit;
