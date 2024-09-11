import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 

function Home() {
  return (
    <div className="home-container">
    
        <h2 className="welcome-message">
          Welcome to the Library Management
        </h2>
      
      <div id="card-area">
        <div className="wrapper">
          <div className="box-area">
            <div className="box">
          
              <div className="overlay">
                <h3>
             
                  <Link to="/students" className="box-link">Student Details</Link>
                </h3>
                <p>Enter the student details</p>
              </div>
            </div>
            <div className="box">
  
              <div className="overlay">
                <h2>
                  <Link to="/books" className="box-link">Book Details</Link>
                </h2>
                <p>Enter the book details</p>
              </div>
            </div>
            <div className="box">
             
              <div className="overlay">
                <h2>
                  <Link to="/library" className="box-link">Library Details</Link>
                </h2>
                <p>Enter the library details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
