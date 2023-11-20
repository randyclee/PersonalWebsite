import React, { useState, useEffect } from 'react';
import ProjectDetails from '@/components/Projects/ProjectDetails'
import { fetchAllProjects } from '@/services/api/projectsApi';

export default function ProjectsPage({darkMode}) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  const loadData = async () => {
    const projectData = await fetchAllProjects();
    setProjects(projectData);
  };

  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "My Projects",
    "url": "https://www.randyclee.com/projects",
    "numberOfItems": projects.length,
    "itemListElement": projects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.description,
        "image": project.mainImage,
        "keywords": project.tags.join(', ')
      }
    }))
  };
  
  const handleProjectClick = project => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  }

  const filteredProjects = selectedTag === 'All' ? projects : projects.filter(project => project.tags.includes(selectedTag));

  return (
    <div className={`${darkMode?"bg-gray-800 text-white":"bg-white text-black" }`}>
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center my-8">My Projects</h1>
      <div className="flex flex-nowrap overflow-x-auto justify-start lg:justify-center gap-3 mb-8 scrollbar-hide">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`rounded-full px-5 py-2 text-xs font-medium ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} focus:outline-none whitespace-nowrap md:px-6 md:py-2 md:text-sm`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.title} 
            className={`${darkMode?"bg-gray-900 text-gray-300":"bg-white text-black" } rounded-lg shadow-md overflow-hidden`}
            onClick={() => handleProjectClick(project)}
          >
            <img src={project.mainImage} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-gray-300 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="text-center">
                <button
                  className="underline rounded-full py-2 text-sm font-medium focus:outline-none"
                  onClick={() => handleProjectClick(project)}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>


      {isProjectModalOpen && (
        <ProjectDetails
          project={selectedProject}
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
        />
      )}
    </div>
    <script
       type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
    />
    </div>
  );
}
