import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import { useState } from 'react'; // Import useState for error message

// This is a placeholder for your actual Login page
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(''); // State for error messages

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setError(''); // Clear any previous errors
      // Simulate a successful login with email/password
      await login(email, password);
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (err) {
      console.error('Failed to log in:', err.message);
      setError('Failed to log in: ' + err.message); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;