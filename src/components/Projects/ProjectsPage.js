import React, { useState, useEffect, useRef } from 'react';
import ProjectDetails from '@/components/Projects/ProjectDetails'
import { fetchAllProjects } from '@/services/api/projectsApi';
import ProjectCard from './ProjectCard';

export default function ProjectsPage({darkMode}) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const tagsContainerRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);


  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  }

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

  const scrollTags = (direction) => {
    if (direction === 'left') {
      tagsContainerRef.current.scrollLeft -= 100;
    } else {
      tagsContainerRef.current.scrollLeft += 100;
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

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

  const filteredProjects = projects.filter(project => 
    selectedTag === 'All' ? true : project.tags.includes(selectedTag)
  ).filter(project => 
    project.title.toLowerCase().includes(searchTerm) || 
    project.description.toLowerCase().includes(searchTerm) || 
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );


  return (
    <div className={`${darkMode?"bg-gray-800 text-white":"bg-white text-black" }`}>
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mt-6 mb-6">My Projects</h1>

      <div className="flex justify-center">
          <input 
            type="text" 
            placeholder="Search Tags or Projects" 
            onChange={handleSearchChange}
            className={`w-full md:w-[40vw] px-4 py-2 mb-6 border ${darkMode?"bg-gray-800 text-white border-gray-300":"bg-white text-black border-black" } rounded-full focus:outline-none`}
          />
        </div>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => scrollTags('left')}>{"<"}</button>
        <div ref={tagsContainerRef} className="flex flex-nowrap overflow-x-auto justify-start gap-3 scrollbar-hide">
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
        <button onClick={() => scrollTags('right')}>{">"}</button>
      </div>

     



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard 
            key={project.title} 
            project={project} 
            darkMode={darkMode}
            onCardClick={() => handleCardClick(project)} 
          />
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
