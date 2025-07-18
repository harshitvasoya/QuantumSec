import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Keeping these as per user's original code

// HackerLogo Component (from the 'hacker-logo-animated' immersive)
const HackerLogo = () => {
  return (
    <div className="flex items-center p-2"> {/* Reduced padding for nav bar */}
      <svg
        width="40" // Smaller size for nav bar
        height="40" // Smaller size for nav bar
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Terminal Screen/Window */}
        <rect x="10" y="15" width="80" height="70" rx="5" ry="5" fill="#1A202C" stroke="#4A5568" strokeWidth="2" />

        {/* Animated Typing Cursor */}
        <line x1="20" y1="30" x2="20" y2="45" stroke="#00FF00" strokeWidth="3" strokeLinecap="round"> {/* Bright Green */}
          <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" />
        </line>

        {/* Dynamic Text Typing */}
        <text x="25" y="38" fontSize="14" fill="#00FF00" fontFamily="monospace" textLength="0">
          ACCESS GRANTED
          <animate
            attributeName="textLength"
            values="0;80"
            dur="2s"
            fill="freeze"
            id="typeAccess"
          />
          <animate
            attributeName="opacity"
            values="1;1;0"
            keyTimes="0;0.9;1"
            dur="0.5s"
            begin="typeAccess.end + 1s"
            fill="freeze"
          />
        </text>

        {/* Glitch/Distortion Lines (subtle animation) */}
        <line x1="10" y1="50" x2="90" y2="50" stroke="#FF00FF" strokeWidth="1" opacity="0.2"> {/* Magenta */}
          <animate attributeName="y1" values="50;52;50" dur="0.5s" repeatCount="indefinite" />
          <animate attributeName="y2" values="50;48;50" dur="0.5s" repeatCount="indefinite" />
        </line>
        <line x1="10" y1="65" x2="90" y2="65" stroke="#00FFFF" strokeWidth="1" opacity="0.2"> {/* Cyan */}
          <animate attributeName="y1" values="65;63;65" dur="0.7s" repeatCount="indefinite" />
          <animate attributeName="y2" values="65;67;65" dur="0.7s" repeatCount="indefinite" />
        </line>

        {/* Flowing Binary Digits */}
        <text x="15" y="75" fontSize="12" fill="#00FF00" opacity="0.7" fontFamily="monospace">101010011011001
          <animate attributeName="x" values="15; -50; 15" dur="8s" repeatCount="indefinite" />
        </text>
        <text x="85" y="85" fontSize="12" fill="#00FFFF" opacity="0.7" fontFamily="monospace">011010100110101
          <animate attributeName="x" values="85; 150; 85" dur="8s" begin="2s" repeatCount="indefinite" />
        </text>

        {/* Abstract "Eye" or "Target" element */}
        <circle cx="50" cy="50" r="10" stroke="#FF0000" strokeWidth="2" fill="none"> {/* Red */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="50" cy="50" r="5" fill="#FF0000" /> {/* Red inner dot */}

      </svg>
      <span className="ml-2 text-xl font-bold text-white font-inter"> {/* Adjusted text size for nav bar */}
        <span className="text-green-400">Quantum</span><span className="text-cyan-400">Sec</span>
      </span>
    </div>
  );
};


const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname.slice(1) || 'home';

  const getNavLinkClass = (page) => {
    return `px-3 py-2 rounded-lg transition-colors duration-300 ${
      currentPage === page
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center"> {/* Removed justify-between */}
        {/* Logo/Home link */}
        <div className="flex items-center mb-4 md:mb-0">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 focus:outline-none"
            aria-label="Home"
          >
            <HackerLogo /> {/* Replaced previous logo with HackerLogo */}
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center md:flex-nowrap gap-2 md:gap-4 md:mx-auto"> {/* Added md:mx-auto */}
          <button onClick={() => navigate('/about')} className={getNavLinkClass('about')}>
            About Me
          </button>
          <button onClick={() => navigate('/projects')} className={getNavLinkClass('projects')}>
            Projects
          </button>
          <button onClick={() => navigate('/blog')} className={getNavLinkClass('blog')}>
            Blogs
          </button>
          <button onClick={() => navigate('/future-scope')} className={getNavLinkClass('future-scope')}>
            Future Scope
          </button>
          <button onClick={() => navigate('/contact')} className={getNavLinkClass('contact')}>
            Contact
          </button>
        </div>

        {/* Removed Right-aligned icons section */}
      </div>
    </nav>
  );
};

export default NavBar;
