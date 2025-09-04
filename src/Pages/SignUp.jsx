import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { useState } from 'react';

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value.trim();
    const surname = e.target.surname.value.trim();
    const day = parseInt(e.target.day.value, 10);
    const month = parseInt(e.target.month.value, 10);
    const year = parseInt(e.target.year.value, 10);
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Validate names
    if (!firstName) return setError('First name is required.');
    if (!surname) return setError('Surname is required.');

    // Validate date
    if (!day || !month || !year) return setError('Date of birth is required.');

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - year;
    const monthDiff = today.getMonth() + 1 - month;
    const dayDiff = today.getDate() - day;
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    if (age < 18) return setError('You must be at least 18 years old.');

    // Validate password
    if (password.length < 6) return setError('Password must be at least 6 characters.');

    try {
      setError('');
      await signup(email, password, { firstName, surname, dob: { day, month, year } });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to sign up:', err.message);
      setError(err.message || 'Failed to sign up.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="p-6 rounded-lg shadow-lg w-96 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp}>
          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {/* Surname */}
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {/* Date of Birth */}
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              name="day"
              placeholder="DD"
              min="1"
              max="31"
              className="w-1/3 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              name="month"
              placeholder="MM"
              min="1"
              max="12"
              className="w-1/3 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              name="year"
              placeholder="YYYY"
              min="1900"
              max={new Date().getFullYear()}
              className="w-1/3 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
