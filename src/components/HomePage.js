import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Network,
  Cloud,
  Lock,
  Eye,
  DollarSign,
  ThumbsUp,
  Image as ImageIcon // Renamed to avoid conflict with Image component
} from 'lucide-react';

// Mock LoadingSpinner and ErrorMessage components for demonstration
// In a real app, these would be in separate files.
const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
    <p className="ml-4 text-white mt-4">Loading content...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500 text-lg">
    <p>Error: {message}</p>
  </div>
);

const HomePage = () => {
  const [heroContent, setHeroContent] = useState(null);
  const [whatIDoContent, setWhatIDoContent] = useState(null);
  const [whyEssentialContent, setWhyEssentialContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);

  // New states for image generation
  const [generateImage, setGenerateImage] = useState(false); // Toggle for image generation
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const navigate = useNavigate();

  // Map icon names to Lucide React components
  const iconMap = {
    ShieldCheck,
    Network,
    Cloud,
    Lock,
    Eye,
    DollarSign,
    ThumbsUp
  };

  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API calls for different sections
        const [heroRes, whatIDoRes, whyEssentialRes] = await Promise.all([
          new Promise(resolve => setTimeout(() => resolve({
            heroTitle: 'Welcome to the CyberSecurity World',
            heroTagline: 'Securing the Digital Frontier, One Threat at a Time.'
          }), 500)),
          new Promise(resolve => setTimeout(() => resolve([
            {
              title: 'Ethical Hacking',
              desc: 'Testing systems for vulnerabilities and strengthening defenses.',
              icon: 'ShieldCheck'
            },
            {
              title: 'Network Security',
              desc: 'Implementing robust security protocols to prevent attacks.',
              icon: 'Network'
            },
            {
              title: 'Cloud Security',
              desc: 'Securing cloud infrastructures from cyber threats.',
              icon: 'Cloud'
            }
          ]), 700)),
          new Promise(resolve => setTimeout(() => resolve([
            {
              title: 'Prevent Data Breaches',
              desc: 'Every 39 seconds, a cyberattack occurs. Cybersecurity prevents data leaks and safeguards sensitive info.',
              icon: 'Lock'
            },
            {
              title: 'Protect User Privacy',
              desc: 'Protecting user privacy is a legal and moral responsibility for everyone.',
              icon: 'Eye'
            },
            {
              title: 'Avoid Financial Loss',
              desc: 'Cybercrime causes massive losses. Security helps avoid monetary loss from ransomware and fraud.',
              icon: 'DollarSign'
            },
            {
              title: 'Maintain Trust & Reputation',
              desc: 'Cybersecurity builds client trust and strengthens your reputation in competitive environments.',
              icon: 'ThumbsUp'
            }
          ]), 900))
        ]);

        setHeroContent(heroRes);
        setWhatIDoContent(whatIDoRes);
        setWhyEssentialContent(whyEssentialRes);

      } catch (err) {
        console.error("Failed to fetch content:", err);
        setError('Failed to load page content.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  // AI handler for both text and image generation
  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setResponse(''); // Clear previous text response
    setGeneratedImageUrl(''); // Clear previous image
    setRateLimitExceeded(false);

    if (generateImage) {
      setIsGeneratingImage(true);
      try {
        const payload = { instances: { prompt: question }, parameters: { "sampleCount": 1 } };
        const apiKey = ""; // Canvas will provide this at runtime
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          if (res.status === 429) {
            setRateLimitExceeded(true);
            setResponse('You’ve hit the rate limit for image generation. Please try again later.');
          } else {
            const errorData = await res.json();
            console.error('Imagen API error:', errorData);
            setResponse(`Error generating image: ${errorData.error?.message || 'Unknown error'}`);
          }
          return;
        }

        const result = await res.json();
        if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
          const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
          setGeneratedImageUrl(imageUrl);
        } else {
          setResponse('No image generated from the prompt.');
        }

      } catch (err) {
        console.error('Imagen fetch error:', err);
        setResponse('An error occurred while generating the image. Please try again.');
      } finally {
        setIsGeneratingImage(false);
      }
    } else { // Text generation
      setAiLoading(true);
      try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: question }] });

        const payload = {
          contents: chatHistory,
          generationConfig: {
            responseMimeType: "text/plain",
          }
        };

        const apiKey = ""; // Canvas will provide this at runtime
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          if (res.status === 429) {
            setRateLimitExceeded(true);
            setResponse('You’ve hit the rate limit for text generation. Please try again later.');
          } else {
            const errorData = await res.json();
            console.error('Gemini API error:', errorData);
            setResponse(`Error from AI: ${errorData.error?.message || 'Unknown error'}`);
          }
          return;
        }

        const result = await res.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const text = result.candidates[0].content.parts[0].text;
          setResponse(text);
        } else {
          setResponse('No valid response received from AI.');
        }

      } catch (err) {
        console.error('Gemini fetch error:', err);
        setResponse('An error occurred while communicating with the AI assistant. Please check your network connection.');
      } finally {
        setAiLoading(false);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 font-['Inter'] min-h-screen">
      {/* Hero Section */}
      {heroContent && (
        <div className="text-center py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4 animate-fade-in">
            {heroContent.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-fade-in delay-200">
            {heroContent.heroTagline}
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
      )}

      {/* What I Do Section */}
      {whatIDoContent && (
        <section className="text-center mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 text-center">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-6 px-4">
            {whatIDoContent.map(({ title, desc, icon }, idx) => {
              const Icon = iconMap[icon]; // Get the component from the map
              return (
                <div
                  key={idx}
                  className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition duration-500 transform hover:-translate-y-1 hover:scale-105"
                >
                  {Icon && <Icon className="mx-auto mb-3 text-blue-400" size={36} />}
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">{title}</h3>
                  <p className="text-gray-400">{desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Why Cybersecurity is Essential Section */}
      {whyEssentialContent && (
        <section className="text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 text-center">Why Cybersecurity is Essential</h2>
          <div className="grid md:grid-cols-4 gap-6 px-4">
            {whyEssentialContent.map(({ title, desc, icon }, idx) => {
              const Icon = iconMap[icon]; // Get the component from the map
              return (
                <div
                  key={idx}
                  className="bg-gray-900 p-6 rounded-xl border border-cyan-700 shadow-md transition duration-500 transform hover:scale-105 hover:shadow-cyan-600/40"
                >
                  {Icon && <Icon className="mx-auto mb-3 text-blue-400" size={32} />}
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* AI Assistant Section */}
      <section className="mt-20 bg-gray-900 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-6 text-center">
          Ask the Security AI Assistant
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Need help understanding a cybersecurity concept or best practice? Or want an image? Ask anything.
        </p>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleAskAI} className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder={generateImage ? "Describe the image you want to generate..." : "e.g., How do I prevent XSS?"}
              className="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <div className="flex items-center space-x-4">
              <label htmlFor="imageToggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="imageToggle"
                    className="sr-only"
                    checked={generateImage}
                    onChange={() => setGenerateImage(!generateImage)}
                  />
                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      generateImage ? 'translate-x-full bg-green-500' : ''
                    }`}
                  ></div>
                </div>
                <ImageIcon className="ml-2 text-white" size={24} />
              </label>
              <button
                type="submit"
                disabled={aiLoading || isGeneratingImage}
                className="bg-green-600 px-6 py-3 rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiLoading ? 'Thinking...' : isGeneratingImage ? 'Generating Image...' : 'Ask AI'}
              </button>
            </div>
          </form>

          {(rateLimitExceeded && !aiLoading && !isGeneratingImage) && (
            <p className="text-red-400 mt-4 text-center">
              You’ve hit the rate limit. Please try again later.
            </p>
          )}

          {(response || generatedImageUrl) && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-green-500 animate-fade-in">
              {response && (
                <>
                  <p className="text-green-300 font-semibold">AI Response:</p>
                  <p className="text-gray-200 mt-2 whitespace-pre-line">{response}</p>
                </>
              )}
              {generatedImageUrl && (
                <div className="mt-4">
                  <p className="text-green-300 font-semibold mb-2">Generated Image:</p>
                  <img
                    src={generatedImageUrl}
                    alt="AI Generated"
                    className="w-full h-auto rounded-lg shadow-md max-w-full"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = "https://placehold.co/600x400/FF0000/FFFFFF?text=Image+Load+Error";
                      setResponse("Failed to load generated image. Please try again.");
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default HomePage;
