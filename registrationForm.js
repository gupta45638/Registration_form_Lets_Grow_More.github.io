import React, { useState, useEffect } from 'react';
import './style.css'; // Import the CSS file

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });

  const [submittedData, setSubmittedData] = useState(null);

  // Load previous data from localStorage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem('submittedData');
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Check if the input is for an image
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any additional validation or API calls
    // to submit the form data to the server.
    setSubmittedData(formData);
    setFormData({
      name: '',
      email: '',
      password: '',
      image: null,
    });
  };

  // Save submitted data to localStorage when it changes
  useEffect(() => {
    if (submittedData) {
      localStorage.setItem('submittedData', JSON.stringify(submittedData));
    }
  }, [submittedData]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Choose an Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      <div className="submitted-data">
        {submittedData ? (
          <>
          
            <h2>Submitted Data:</h2>
            <center>
            {submittedData.image && (
              <div className="submitted-image">
                <img src={submittedData.image} alt="Submitted" />
              </div>
            )}
            </center>
            <p>Name: {submittedData.name}</p>
            <p>Email: {submittedData.email}</p>
            <p>Password: {submittedData.password}</p>
            
          </>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
