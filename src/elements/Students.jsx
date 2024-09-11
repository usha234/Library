// src/components/Students.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Students() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    useEffect(() => {
        if (deleted) {
            setDeleted(false);
            axios.get('/students')
                .then((res) => {
                    console.log('Fetched data:', res.data); 
                    setData(res.data);
                })
                .catch((err) => console.log('Error fetching data:', err));
        }
    }, [deleted]);

    function handleDelete(id) {
        axios.delete(`/delete/${id}`)
            .then(() => {
                setDeleted(true);
            })
            .catch((err) => console.log('Error deleting data:', err));
    }

    return (
        <div className='container-fluid bg-primary vh-100 vw-100'>
            <h3>Students</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/students/create'>Add Student</Link>
            </div>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Image</th>
                        <th>Video</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.clas}</td>
                                <td>
                                    {student.image && (
                                        <img src={`/uploads/${student.image}`} alt={student.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    )}
                                </td>
                                <td>
                                    {student.video && (
                                        <video controls style={{ width: '100px' }}>
                                            <source src={`/uploads/${student.video}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </td>
                                <td>
                                    <Link className='btn mx-2 btn-success' to={`/students/edit/${student.id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(student.id)} className='btn mx-2 btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No data available</td>
                        </tr>
                    )}
                </tbody>
                <br></br>
                
                <Link to="/" className="btn btn-success">
        Back
      </Link>
      
            </table>
        </div>
    );
}

export default Students;
