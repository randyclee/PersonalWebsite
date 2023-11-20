import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { fetchAllProjects, deleteProject } from '@/services/api/projectsApi';

const ProjectList = () => {
  const [currentProject, setCurrentProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await fetchAllProjects();
    setProjects(data);
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setIsNew(false)
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentProject(null); 
    setIsNew(true)
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id.toString());
      await loadProjects();
    }
  };

  const handleSubmit = async (projectData) => {
    setIsModalOpen(false);
    await loadProjects(); 
  };

  return (
    <div className="flex flex-nowrap overflow-x-auto py-2 ">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} onEdit={handleEdit} onDelete={handleDelete}/>
      ))}
     <div className="card flex-shrink-0 w-full sm:w-auto md:w-[70vw] lg:w-[50vw] xl:w-[40vw] bg-blue-200 text-black shadow-xl m-2 flex items-center justify-center cursor-pointer" onClick={handleAddNew}>
        <div className="text-3xl">+</div>
      </div>
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} project={currentProject} isNew={isNew}/>
    </div>
  );
};

export default ProjectList;
