import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ContactPage = () => {
  const [contactDetails, setContactDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const fetchContactDetails = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        try {
          const mockData = {
            email: 'harcthack@gmail.com',
            linkedin: 'https://www.linkedin.com/in/harshit-vasoya/',
            linkedinText: 'harshit-vasoya',
            github: 'https://github.com/harshitvasoya',
            githubText: 'harshitvasoya',
            location: 'Surat, India',
          };
          setContactDetails(mockData);
        } catch (err) {
          setError('Failed to load contact details.');
        } finally {
          setLoading(false);
        }
      }, 1000);
    };

    fetchContactDetails();
  }, []);

  // Updated form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('⏳ Sending your message...');

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:5000/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('✅ Thank you! Your message has been sent. I’ll reply to you shortly via email.');
        event.target.reset(); // clear form fields
      } else {
        const errorMsg = result.message || 'Something went wrong. Please try again.';
        setFormStatus(`❌ ${errorMsg}`);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setFormStatus('❌ Network error. Please try again later.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-8 text-center">
        Get in Touch
      </h1>
      <p className="text-lg leading-relaxed text-gray-300 mb-8 max-w-3xl mx-auto text-center">
        I'm always open to discussing new projects, interesting ideas, or opportunities to collaborate. Feel free to reach out!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Contact Information */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Contact Information</h2>
          <p className="flex items-center text-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-white">{contactDetails.email}</span>
          </p>
          <p className="flex items-center text-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
              {contactDetails.linkedinText}
            </a>
          </p>
          <p className="flex items-center text-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.196-6.086 8.196-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <a href={contactDetails.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:underline">
              {contactDetails.githubText}
            </a>
          </p>
          <p className="flex items-center text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white">{contactDetails.location}</span>
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Name:</label>
              <input type="text" id="name" name="name" required className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email:</label>
              <input type="email" id="email" name="email" required className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Message:</label>
              <textarea id="message" name="message" rows="5" required className="shadow appearance-none border border-gray-600 rounded-lg w-full py-2 px-3 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105">
              Send Message
            </button>
            {formStatus && (
              <p className="mt-4 text-center text-sm font-medium text-blue-300">{formStatus}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
