import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const AboutMePage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeError, setResumeError] = useState(null);

  useEffect(() => {
    const fetchAboutMeContent = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        try {
          const mockData = {
            heading: 'About Me: Harshit Vasoya',
            summary:
              "I am a results-oriented cybersecurity professional with a passion for offensive and defensive security strategies. My expertise includes penetration testing, vulnerability assessment, security architecture, and compliance. I am committed to continuous learning and staying ahead of emerging threats to ensure robust digital security.",
            skills: [
              'Vulnerability Assessment & Management',
              'Application Security Android/Iso',
              'Risk Control & Management',
              'Linux, CTF',
              'Incident Response',
              'Network Security',
              'Compliance, regulations (GDPR, ISO-27001, HIPAA)',
              'Python, Bash, PowerShell',
            ],
            education: [
              {
                degree: 'M. Tech in Cyber Security',
                institution: 'National Forensic Sciences University',
                year: '2023-2025',
                details: 'Specialized in Cybersecurity & ethical hacking.'
              },
              {
                degree: 'B. Tech in Computer Science',
                institution: 'Indus University',
                year: '2019-2023',
                details: 'Focused on algorithms, data structures, and foundational programming and development.'
              },
            ],
            certifications: [
              'OSCP (Offensive Security Certified Professional)',
              'CEH (Certified Ethical Hacker)',
              'CompTIA Security+',
              'Certified Cloud Security Professional (CCSP)',
            ],
          };
          setContent(mockData);
        } catch (err) {
          setError('Failed to load About Me content.');
        } finally {
          setLoading(false);
        }
      }, 1000);
    };

    fetchAboutMeContent();
  }, []);

  const handleDownloadResume = async () => {
    try {
      setResumeLoading(true);
      setResumeError(null);

      const res = await fetch('http://localhost:5000/api/resume'); // Backend resume route
      if (!res.ok) throw new Error('Resume not found');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'Harshit_Vasoya_Resume.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setResumeError('Unable to download resume. Please try again later.');
    } finally {
      setResumeLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">{content.heading}</h1>
      <p className="text-lg leading-relaxed text-gray-300 mb-8">{content.summary}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills Section */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Skills</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {content.skills.map((skill, index) => (
              <li key={index} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Education Section */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Education</h2>
          {content.education.map((edu, index) => (
            <div key={index} className="mb-4 bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium text-white">{edu.degree}</h3>
              <p className="text-gray-300">{edu.institution}, {edu.year}</p>
              <p className="text-sm text-gray-400 mt-1">{edu.details}</p>
            </div>
          ))}

          {/* Resume Download Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">Resume</h2>
            <button
              onClick={handleDownloadResume}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow-md transition duration-200"
              disabled={resumeLoading}
            >
              {resumeLoading ? 'Preparing...' : '📄 Download My Resume'}
            </button>
            {resumeError && <p className="text-red-400 mt-2">{resumeError}</p>}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Certifications</h2>
        <div className="flex flex-wrap gap-4">
          {content.certifications.map((cert, index) => (
            <span
              key={index}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow-md"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMePage;
