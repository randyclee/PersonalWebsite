'use client';
import { useState, useRef, useEffect } from 'react';
import { FiUser, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import ProjectDetailsModal from './ProjectDetailsModal';
import ProjectSubmissionModal from './ProjectSubmissionModal';
import { fetchAllVotes } from '@/services/api/voteApi';

export default function VotePage({ darkMode }) {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());
  const descriptionRefs = useRef(new Map());
  const [overflowedDescriptions, setOverflowedDescriptions] = useState(new Set());
  const [projectsSchema, setProjectsSchema] = useState({});

  useEffect(() => {
    loadVotes();
  }, []);

  const loadVotes = async () => {
    const data = await fetchAllVotes();
    setProjects(data);
  };


  useEffect(() => {
    const generateSchema = () => {
      const itemListElement = projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication", 
          "name": project.name,
          "description": project.description,
          "image": project.imageUrl,
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": {
              "@type": "VoteAction"
            },
            "userInteractionCount": project.votes
          }
        }
      }));

      const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Vote on Projects",
        "description": "A list of projects users can vote on or submit new ideas for software projects.",
        "url": "https://www.yoursite.com/vote",
        "numberOfItems": projects.length,
        "itemListElement": itemListElement
      };

      setProjectsSchema(schema);
    };

    generateSchema();
  }, [projects]);



  useEffect(() => {
    // Check for overflow and update the button display accordingly
    descriptionRefs.current.forEach((el, id) => {
      const moreButton = el.nextSibling;
      if (el && !expandedDescriptions.has(id) && checkOverflow(el)) {
        moreButton.style.display = 'block';
      } else {
        moreButton.style.display = 'none';
      }
    });
    Object.entries(descriptionRefs.current).forEach(([id, ref]) => {
      const isOverflowing = ref.scrollHeight > ref.clientHeight;
      if (isOverflowing) {
        // Set the 'More' button to be visible if the text is overflowing
        ref.nextElementSibling.style.display = 'block';
      } else {
        ref.nextElementSibling.style.display = 'none';
      }
    });
  }, [projects, expandedDescriptions]);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prevExpandedDescriptions) => {
      const newExpanded = new Set(prevExpandedDescriptions);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };

  const handleVote = (projectId) => {
    if (window.confirm('Are you sure you want to vote for this project?')) {
      const updatedProjects = projects.map((p) =>
        p.id === projectId ? { ...p, votes: p.votes + 1 } : p
      );
      setProjects(updatedProjects);
      setToast({ show: true, message: 'Vote recorded!' });
    }
  };
  const closeToast = () => {
    setToast({ show: false, message: '' });
  };
  const checkDescriptionsOverflow = () => {
    descriptionRefs.current.forEach((desc, id) => {
      if (desc) {
        setExpandedDescriptions(prev => {
          const newSet = new Set([...prev]);
          if (desc.scrollHeight > desc.clientHeight) {
            newSet.add(id);
          } else {
            newSet.delete(id);
          }
          return newSet;
        });
      }
    });
  };

  const checkOverflow = (element) => {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  };

  useEffect(() => {
    checkDescriptionsOverflow();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newOverflowedDescriptions = new Set();
      
      projects.forEach((project) => {
        const element = document.getElementById(`description-${project.id}`);
        if (element) {
          if (element.scrollHeight > element.clientHeight) {
            newOverflowedDescriptions.add(project.id);
          }
        }
      });

      setOverflowedDescriptions(newOverflowedDescriptions);
    };

    // Check overflow on mount and on window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [projects]);

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`container mx-auto px-4 py-14 min-h-screen`}>
        <h1 className="text-4xl font-bold text-center mt-10 mb-3">Vote on Projects</h1>
        <div className="text-center mb-6">
        <button
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => setSubmissionModalOpen(true)}
          >           
          Submit a Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} card w-full bg-base-100 shadow-xl relative`}>
            {project.workInProgress && (
              <div className="absolute top-0 left-0 bg-yellow-500 text-white px-2 py-1 rounded">
                Work In Progress
              </div>
            )}
            <figure>
              <img className="object-cover h-48 w-full" src={project.imageUrl} alt="Project" />
            </figure>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title ">{project.name}</h2>
                <div className="flex items-center">
                  <FiUser className="inline-block" />
                  <div className="badge border border-yellow-900 bg-yellow-900 text-white ml-2">{project.votes}</div>
                </div>
              </div>
              <p className="text-sm -mt-1">{`Submitted by ${project.submitterName || 'Anonymous'}`}</p>
              <p
                id={`description-${project.id}`}
                className={` line-clamp-3 ${expandedDescriptions.has(project.id) ? 'line-clamp-none' : ''}`}
              >
                {project.description}
              </p>
              {overflowedDescriptions.has(project.id) && (
                <div className="text-center mt-2">
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => toggleDescription(project.id)}
                  >
                    {expandedDescriptions.has(project.id) ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </div>
              )}
              <div className="card-actions justify-between mt-4">
                <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full w-30" onClick={() => openModal(project)}>
                  Learn More
                </button>
                <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full w-30" onClick={() => handleVote(project.id)}>
                  Vote
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>

        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }} 
        />

        {isModalOpen && (
        <ProjectDetailsModal
              isOpen={isModalOpen}
              onClose={() => closeModal()}
              selectedProject={selectedProject}
              darkMode = {darkMode}
          />
        )}
        {isSubmissionModalOpen && (
          <ProjectSubmissionModal
          isOpen={isSubmissionModalOpen}
          onClose={() => setSubmissionModalOpen(false)}
          darkMode = {darkMode}
        />
        )}
        {toast.show && (
          <div className="toast">
            <div className="alert alert-success">
              <div>
                <span>{toast.message}</span>
              </div>
              <div className="flex-none">
                <button className="btn btn-sm btn-ghost" onClick={closeToast}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}