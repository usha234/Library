import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Books() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    useEffect(() => {
        if (deleted) {
            setDeleted(false);
            axios.get('/books')
                .then((res) => {
                    console.log('Fetched data:', res.data);
                    setData(res.data);
                })
                .catch((err) => console.log('Error fetching data:', err));
        }
    }, [deleted]);

    const handleDelete = (id) => {
        axios.delete(`/books/delete/${id}`)
            .then(() => {
                console.log(`Book with ID: ${id} deleted successfully`);
                setDeleted(true);
            })
            .catch((err) => console.log('Error deleting data:', err));
    };

    return (
        <div className='container-fluid bg-primary vh-100 vw-100'>
            <h3>Books</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/books/bcreate'>Add Book</Link>
            </div>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Publication</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.publish}</td>
                                <td>{book.year}</td>
                                <td>
                                    <Link className='btn mx-2 btn-success' to={`/books/bedit/${book.id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(book.id)} className='btn mx-2 btn-danger'>Delete</button>
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

export default Books;
