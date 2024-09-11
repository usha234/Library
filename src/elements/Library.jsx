import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Library() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    useEffect(() => {
        if (deleted) {
            setDeleted(false);
            axios.get('/library')
                .then((res) => {
                    console.log('Fetched data:', res.data);
                    setData(res.data);
                })
                .catch((err) => console.log('Error fetching data:', err));
        }
    }, [deleted]);

    const handleDelete = (id) => {
        axios.delete(`/library/delete/${id}`)
            .then(() => {
                console.log(`Library entry with ID: ${id} deleted successfully`);
                setDeleted(true);
            })
            .catch((err) => console.log('Error deleting data:', err));
    };

    return (
        <div className='container-fluid bg-primary vh-100 vw-100'>
            <h3>Library</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/library/lcreate'>Add Entry</Link>
            </div>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Student Name</th>
                        <th>Book Name</th>
                        <th>Start Date</th>
                        <th>Last Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.sname}</td>
                                <td>{entry.bname}</td>
                                <td>{entry.sd}</td>
                                <td>{entry.ld}</td>
                                <td>
                                    <Link className='btn mx-2 btn-success' to={`/library/ledit/${entry.id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(entry.id)} className='btn mx-2 btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />
            <Link to="/" className="btn btn-success">
                Back
            </Link>
        </div>
    );
}

export default Library;
