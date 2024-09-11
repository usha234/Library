import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function Lcreate() {
    const [values, setValues] = useState({
        sname: '',
        bname: '',
        sd: '',
        ld: ''
    });

    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
       
        axios.get('/students')
            .then(res => {
                setStudents(res.data);
            })
            .catch(err => console.log('Error fetching students:', err));

    
        axios.get('/books')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.log('Error fetching books:', err));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        axios.post('/library/add', values) 
            .then((res) => {
                console.log(res);
                navigate('/library');  
            })
            .catch((err) => console.log(err));
    }

    function handleInputChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleCancel() {
        setValues({
            sname: '',
            bname: '',
            sd: '',
            ld: ''
        });
        navigate('/library');  
    }

    return (
        <div className='container vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Library Entry</h3>
                <div className='d-flex justify-content-end'>
                    <Link to='/library' className='btn btn-success'>Home</Link> 
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='sname'>Student Name</label>
                        <select 
                            name='sname' 
                            value={values.sname} 
                            required 
                            onChange={handleInputChange} 
                            className='form-control'
                        >
                            <option value=''>Select a student</option>
                            {students.map(student => (
                                <option key={student.id} value={student.name}>
                                    {student.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='bname'>Book Name</label>
                        <select 
                            name='bname' 
                            value={values.bname} 
                            required 
                            onChange={handleInputChange} 
                            className='form-control'
                        >
                            <option value=''>Select a book</option>
                            {books.map(book => (
                                <option key={book.id} value={book.name}>
                                    {book.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='sd'>Start Date</label>
                        <input 
                            type='date' 
                            name='sd' 
                            value={values.sd} 
                            required 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='ld'>Last Date</label>
                        <input 
                            type='date' 
                            name='ld' 
                            value={values.ld} 
                            required 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <button type='submit' className='btn btn-success'>Save</button>
                        <button type='button' className='btn btn-secondary mx-2' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Lcreate;
