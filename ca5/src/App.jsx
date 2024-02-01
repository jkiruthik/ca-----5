// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import BookList from './BookList';
import RegisterForm from './RegisterForm';

function App() {

  // state inisiale
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

  // fetching the api data
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

  // search function
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // filtre data value
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

  // to check the form
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
      <Header registered={registered} searchTerm={searchTerm} handleSearch={handleSearch} />
      {registered ? (
        <BookList books={books} filteredBooks={filteredBooks} />
      ) : (
        <RegisterForm
          formData={formData}
          formErrors={formErrors}
          handleInputChange={handleInputChange}
          handleRegister={handleRegister}
        />
      )}
    </div>
  );
}

export default App;
