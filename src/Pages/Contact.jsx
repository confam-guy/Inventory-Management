import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);

    emailjs
      .send(
        'YOUR_SERVICE_ID', // from EmailJS dashboard
        'YOUR_TEMPLATE_ID', // from EmailJS dashboard
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY' // from EmailJS dashboard
      )
      .then(
        (result) => {
          setLoading(false);
          alert('Thank you! Your message has been sent.');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          setLoading(false);
          console.error('Email send error:', error);
          alert('Something went wrong. Please try again.');
        }
      );
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto my-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2">
        Contact Us
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            placeholder="Your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="mt-8 text-center text-gray-600">
        <p className="mb-2">Alternatively, you can reach us at:</p>
        <p className="font-semibold">Email: guccydon@gmail.com</p>
        <p className="font-semibold">Phone: +234 (80) 2226-4404</p>
      </div>
    </div>
  );
};

export default Contact;
