import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const sanitized = data.map((p) => ({
          id: p._id,
          title: p.title,
          description: p.description,
          technologies: Array.isArray(p.technologies) ? p.technologies : [],
          githubLink: p.githubLink,
          demoLink: p.demoLink || null,
          image: p.image || 'https://placehold.co/400x250?text=No+Image',
          category: p.category || 'Uncategorized',
        }));

        setProjects(sanitized);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load projects from the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-8 text-center">
        My Cybersecurity Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-700 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x250/3e4451/abb2bf?text=Image+Not+Found';
              }}
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-blue-300 mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-gray-600 text-gray-200 text-xs px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mb-4">Category: {project.category}</p>
              <div className="flex space-x-4">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium"
                  >
                    GitHub
                  </a>
                )}
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
