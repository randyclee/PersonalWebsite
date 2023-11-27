import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import React, { useState } from 'react';

const ProjectCard = ({ project, darkMode, onCardClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = (e) => {
    e.stopPropagation(); // Prevent the card's main click event
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`${darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-black"} rounded-lg shadow-md overflow-hidden`}
      onClick={onCardClick}
    >
      <img src={`${process.env.APP_URL}${project.mainImage}`} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className={`mb-3 ${!isExpanded ? "line-clamp-3" : ""}`}>{project.description}</p>
        <div className="text-center">
          <button
            className="text-center text-xl focus:outline-none"
            onClick={toggleDescription}
          >
            {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-gray-300 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="text-center">
                <button
                  className="underline rounded-full py-2 text-sm font-medium focus:outline-none"
                >
                  Learn More
                </button>
              </div>
            </div>
      </div>
  );
};

export default ProjectCard