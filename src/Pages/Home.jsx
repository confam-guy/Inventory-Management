import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Ensure you have Tailwind CSS set up in your project

const Home = () => {
  return (
    <section className="bg-[#f0f6ff] min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center" id='uu'>
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">InvTrack</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Your ultimate solution for real-time inventory management. <br />
          Track, project, and manage payments with ease.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/features"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
