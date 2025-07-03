import React, { useState } from 'react';
import ErrorMessage from '../common/ErrorMessage';

const RegisterPage = ({ onRegister, onNavigate, error, onClearError }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClearError();
    
    if (!validateForm()) {
      return;
    }
    
    const result = await onRegister(formData.name, formData.email, formData.password);
    if (result.success) {
      onNavigate('home');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        
        <ErrorMessage 
          message={error} 
          onClose={onClearError}
        />
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-red-500 ${
                validationErrors.name ? 'border-red-500' : ''
              }`}
              placeholder="Enter your full name"
            />
            {validationErrors.name && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-red-500 ${
                validationErrors.email ? 'border-red-500' : ''
              }`}
              placeholder="Enter your email"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-red-500 ${
                validationErrors.password ? 'border-red-500' : ''
              }`}
              placeholder="Enter your password"
            />
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-red-500 ${
                validationErrors.confirmPassword ? 'border-red-500' : ''
              }`}
              placeholder="Confirm your password"
            />
            {validationErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Register
          </button>
        </form>
        
        <p className="text-center mt-4">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 