// RegisterForm.js
import React from 'react';

const RegisterForm = ({ formData, formErrors, handleInputChange, handleRegister }) => {
  return (
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
  );
}

export default RegisterForm;
