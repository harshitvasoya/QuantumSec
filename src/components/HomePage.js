import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Network,
  Cloud,
  Lock,
  Eye,
  DollarSign,
  ThumbsUp
} from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const HomePage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomePageContent = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        try {
          const mockData = {
            heroTitle: 'Welcome to the CyberSecurity World',
            heroTagline: 'Securing the Digital Frontier, One Threat at a Time.'
          };
          setContent(mockData);
        } catch (err) {
          setError('Failed to load home page content.');
        } finally {
          setLoading(false);
        }
      }, 1000);
    };
    fetchHomePageContent();
  }, []);

  // ✅ Gemini-integrated AI handler
  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setAiLoading(true);
    setResponse('');
    setRateLimitExceeded(false);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/ask-gemini`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: question })
      });

      if (res.status === 429) {
        setRateLimitExceeded(true);
        return;
      }

      const data = await res.json();
      setResponse(data.response || 'No response received from AI.');
    } catch (err) {
      console.error('Gemini fetch error:', err);
      setResponse('An error occurred while communicating with the AI assistant.');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
      {/* Hero Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4 animate-fade-in">
          {content.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-fade-in delay-200">
          {content.heroTagline}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            View My Projects
          </button>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Read My Blog
          </button>
        </div>
      </div>

      {/* What I Do Section */}
      <section className="text-center mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 text-center">What I Do</h2>
        <div className="grid md:grid-cols-3 gap-6 px-4">
          {[
            {
              title: 'Ethical Hacking',
              desc: 'Testing systems for vulnerabilities and strengthening defenses.',
              icon: ShieldCheck
            },
            {
              title: 'Network Security',
              desc: 'Implementing robust security protocols to prevent attacks.',
              icon: Network
            },
            {
              title: 'Cloud Security',
              desc: 'Securing cloud infrastructures from cyber threats.',
              icon: Cloud
            }
          ].map(({ title, desc, icon: Icon }, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition duration-500 transform hover:-translate-y-1 hover:scale-105"
            >
              <Icon className="mx-auto mb-3 text-blue-400" size={36} />
              <h3 className="text-xl font-semibold text-blue-300 mb-2">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Cybersecurity is Essential Section */}
      <section className="text-center mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 text-center">Why Cybersecurity is Essential</h2>
        <div className="grid md:grid-cols-4 gap-6 px-4">
          {[
            {
              title: 'Prevent Data Breaches',
              desc: 'Every 39 seconds, a cyberattack occurs. Cybersecurity prevents data leaks and safeguards sensitive info.',
              icon: Lock
            },
            {
              title: 'Protect User Privacy',
              desc: 'Protecting user privacy is a legal and moral responsibility for everyone.',
              icon: Eye
            },
            {
              title: 'Avoid Financial Loss',
              desc: 'Cybercrime causes massive losses. Security helps avoid monetary loss from ransomware and fraud.',
              icon: DollarSign
            },
            {
              title: 'Maintain Trust & Reputation',
              desc: 'Cybersecurity builds client trust and strengthens your reputation in competitive environments.',
              icon: ThumbsUp
            }
          ].map(({ title, desc, icon: Icon }, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-6 rounded-xl border border-cyan-700 shadow-md transition duration-500 transform hover:scale-105 hover:shadow-cyan-600/40"
            >
              <Icon className="mx-auto mb-3 text-blue-400" size={32} />
              <h3 className="text-xl font-semibold text-blue-300 mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="mt-20 bg-gray-900 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-6 text-center">
          Ask the Security AI Assistant
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Need help understanding a cybersecurity concept or best practice? Ask anything.
        </p>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleAskAI} className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="e.g., How do I prevent XSS?"
              className="w-full p-3 rounded-md text-black"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="bg-green-600 px-6 py-3 rounded-md hover:bg-green-700 transition"
            >
              {aiLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </form>

          {rateLimitExceeded && (
            <p className="text-red-400 mt-4 text-center">
              You’ve hit the rate limit. Please try again later.
            </p>
          )}

          {response && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-green-500">
              <p className="text-green-300 font-semibold">AI Response:</p>
              <p className="text-gray-200 mt-2 whitespace-pre-line">{response}</p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default HomePage;
