import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function Create() {
    const [values, setValues] = useState({
        name: '',
        clas: '',
        image: null,
        video: null  
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('clas', values.clas);
        if (values.image) formData.append('image', values.image);
        if (values.video) formData.append('video', values.video);

        axios.post('/add_user', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            console.log(res);
            navigate('/students'); 
        })
        .catch((err) => console.log(err));
    }

    function handleInputChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleFileChange(e) {
        setValues({ ...values, [e.target.name]: e.target.files[0] });
    }

    function handleCancel() {
        setValues({
            name: '',
            clas: '',
            image: null,
            video: null  
        });
        navigate('/students'); 
    }

    return (
        <div className='container vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Student</h3>
                <div className='d-flex justify-content-end'>
                    <Link to='/students' className='btn btn-success'>Home</Link>
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
                        <label htmlFor='clas'>Class</label>
                        <input 
                            type='text' 
                            name='clas' 
                            value={values.clas} 
                            required 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='image'>Image</label>
                        <input 
                            type='file' 
                            name='image' 
                            accept='image/*' 
                            onChange={handleFileChange} 
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='video'>Video</label>
                        <input 
                            type='file' 
                            name='video' 
                            accept='video/*' 
                            onChange={handleFileChange} 
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

export default Create;
