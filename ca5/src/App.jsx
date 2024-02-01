import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    axios.get('https://reactnd-books-api.udacity.com/books', {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then(response => {
      setBooks(response.data.books);
      setFilteredBooks(response.data.books);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const validateForm = () => {
    let errors = {};
    if (formData.name.length < 3 || formData.name.length > 30) {
      errors.name = 'Name must be between 3 and 30 characters';
    }
    if (!formData.email.includes('@')) {
      errors.email = 'Invalid email address';
    }
    if (formData.password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = 'Password must be at least 10 characters long and contain at least one special character';
    }
    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = 'Passwords do not match';
    }
    return errors;
  }

  const handleRegister = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('Registering user:', formData);

      setFormData({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
      });
      setRegistered(true);
    } else {
      setFormErrors(errors);
    }
  }

  return (
    <div>
      <header>
        <h1 className='heading'>Kalvium Books</h1>
        {registered ? (
          <input
            className='search_bar'
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={handleSearch}
          />
        )  : null}
      </header>
      {registered ? (
        <div className="book_list">
          {filteredBooks.map(book => (
            <div key={book.id} className="book">
              <img src={book.imageLinks.thumbnail} alt={book.title} />
              <div>
              <h2>{book.title}</h2>
              <p>{book.authors.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="register-form">
          <h2>Sign Up</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
            value={formData.repeatPassword}
            onChange={handleInputChange}
          />
          {formErrors.repeatPassword && <p className="error">{formErrors.repeatPassword}</p>}
          <button onClick={handleRegister}>Sign Up</button>
        </div>
      )}
    </div>
  );
}

export default App;
