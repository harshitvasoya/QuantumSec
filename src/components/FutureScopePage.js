import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

// Future Scope Page Component
const FutureScopePage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call for future scope content
    const fetchFutureScopeContent = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        try {
          const mockData = {
            heading: 'My Future Scope in Cybersecurity',
            paragraph:
              "The cybersecurity landscape is constantly evolving, and I am committed to continuous growth and adaptation. My future endeavors will focus on advanced areas, research, and contributing to the community.",
            learningPaths: [
              'Advanced Penetration Testing (e.g., OSWE, OSEE)',
              'Reverse Engineering and Exploit Development',
              'AI/ML in Cybersecurity (Threat Detection, Automation)',
              'Quantum-Safe Cryptography',
              'Industrial Control System (ICS) Security',
              'DevSecOps Principles and Implementation',
            ],
            researchInterests: [
              'Zero-Day Vulnerability Research',
              'Post-Quantum Cryptography Implementations',
              'Adversarial AI in Security',
              'Blockchain Applications for Security',
              'Human Factors in Cybersecurity',
            ],
            contributions: [
              'Open-source security tool development',
              'Mentoring aspiring cybersecurity professionals',
              'Speaking at industry conferences',
              'Publishing research papers on novel attack/defense techniques',
            ],
          };
          setContent(mockData);
        } catch (err) {
          setError('Failed to load Future Scope content.');
        } finally {
          setLoading(false);
        }
      }, 1000);
    };

    fetchFutureScopeContent();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-8 text-center">
        {content.heading}
      </h1>
      <p className="text-lg leading-relaxed text-gray-300 mb-8 max-w-3xl mx-auto text-center">
        {content.paragraph}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Learning Paths */}
        <div className="bg-gray-700 p-5 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">
            Future Learning & Certifications
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {content.learningPaths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Research Interests */}
        <div className="bg-gray-700 p-5 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Research Interests</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {content.researchInterests.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contributions */}
      <div className="mt-8 bg-gray-700 p-5 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Planned Contributions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {content.contributions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FutureScopePage;
