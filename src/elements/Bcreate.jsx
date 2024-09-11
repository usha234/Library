import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function Bcreate() {
    const [values, setValues] = useState({
        name: '',
        author: '',
        publish: '',
        year: ''
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        axios.post('/books/add', values)
            .then((res) => {
                console.log(res);
                navigate('/books'); 
            })
            .catch((err) => console.log(err));
    }

    function handleInputChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleCancel() {
        setValues({
            name: '',
            author: '',
            publish: '',
            year: ''
        });
        navigate('/books'); 
    }

    return (
        <div className='container vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Book</h3>
                <div className='d-flex justify-content-end'>
                    <Link to='/books' className='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            value={values.name} 
                            required 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='author'>Author</label>
                        <input 
                            type='text' 
                            name='author' 
                            value={values.author} 
                            required 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='publish'>Publication</label>
                        <input 
                            type='text' 
                            name='publish' 
                            value={values.publish} 
                            required 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='year'>Year</label>
                        <input 
                            type='number' 
                            name='year' 
                            value={values.year} 
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

export default Bcreate;
