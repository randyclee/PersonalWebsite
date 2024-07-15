'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {  FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProjectDetails from '@/components/Projects/ProjectDetails'
import ImageModal from '@/components/ImageModal'; 
import { fetchHighlightProjects } from '@/services/api/projectsApi';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import Image from 'next/image';

const ProjectsCarousel = ({darkMode}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  const loadData = async () => {
    const projectData = await fetchHighlightProjects();
    setProjects(projectData);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: true, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false, 
        }
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: true,

        }
      }
      ]
    };
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
      setIsExpanded(!isExpanded);
    };


  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <div className = {`${darkMode ? 'bg-gradient-to-l from-black via-gray-900 to-black text-gray-300' : 'bg-gradient-to-l from-white via-gray-100 to-white text-black'}`}>
    <style jsx global>{`
      .slick-dots li button:before {
        color: ${darkMode ? '#ffffff' : '#000000'} !important; /* Inactive dots */
      }
      .slick-dots li.slick-active button:before {
        color: ${darkMode ? '#ffffff' : '#000000'} !important; /* Active dot */
      }
    `}</style>

<style jsx global>{`
  .slider-container { 
    position: relative;
  }
  .slick-prev, .slick-next {
    position: absolute;
    z-index: 1;
    top: 50%; 
    transform: translateY(-50%); 
  }
  .slick-prev {
    left: 10vw; 
  }
  .slick-next {
    right: 10vw; 
  }
  .slick-prev:before, .slick-next:before {
    font-size: 2rem; 
    color: ${darkMode ? 'E0E0E0' : 'black'} !important; 
  }
`}</style>

                
    <div className="flex flex-col items-center justify-center py-10 ">
      <h2 className="text-3xl font-bold mb-2 ">Featured Projects</h2>
      <div className="w-full mx-auto pb-4">
  <Slider {...settings}>
    {projects.map((project, index) => (
      
            <button key={index} className="p-4 focus:outline-none" >
            <div className="flex flex-col items-center space-y-4 w-[90vw] lg:w-[80vw] max-w-4xl mx-auto card shadow-lg pb-4 px-5 md:px-20">
          <div className="flex flex-wrap justify-center gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="bg-gray-800 text-white rounded-full px-3 py-1 text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="w-full flex justify-center"
          href="#"
          onClick={() => handleImageClick(project.mainImage)}
          >
            <Image 
              src={`${process.env.APP_URL}${project.mainImage}`}
              alt={`Main Image for ${project.title}`}
              className="object-contain h-64 w-64 py-2 mx-auto "
              width={800}
              height={500}
              
            />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-center">{project.title}</h3>

          <p className={`text-md md:text-lg sm:text-base text-left w-full ${!isExpanded ? 'line-clamp-3' : ''}`}>
                  {project.description}
                </p>
                <div className="text-center">
                  <button
                    className="text-center text-xl focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDescription();
                    }}
                  >
                    {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                  </button>
                </div>  
          <div className="flex justify-center gap-4 w-full">
            {project.images.map((image, imgIndex) => (
                  <div key={imgIndex} href="#" className="w-10 h-10 md:w-20 md:h-20 rounded-full overflow-hidden border border-gray-300"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleImageClick(image);
                  }}
                  >
                    <Image 
                      src={`${process.env.APP_URL}${image}`}
                      alt={`Project ${project.title} Image ${imgIndex + 1}`}
                      className="w-full h-full object-cover cursor-pointer"    
                      width= {800}
                      height={500}
                      
                    />
                  </div>
                ))}
          </div>
          <a 
            onClick={() => handleProjectClick(project)}
            className=" px-4 py-2 rounded underline transition duration-300 ease-in-out text-sm sm:text-base"
          >
            Show more information
          </a>

          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  "name": project.title,
                  "description": project.description,
                  "image": project.images,
                  "operatingSystem": "Any applicable operating systems",
                  "applicationCategory": "Application",
                  "author": {
                    "@type": "Person",
                    "name": "Randy Lee",
                    "url": "https://www.randyclee.com"
                  },
                }),
              }}
            />
        </div>
      </button>
      
    ))}
  </Slider>

</div>
  <div className="text-center mt-8">
        <Link href="/projects" className="hover:underline inline-flex items-center justify-center">
        View All Projects <FaArrowRight className="ml-2" />
      </Link>
    </div>


      {isProjectModalOpen && (
        <ProjectDetails
          project={selectedProject}
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
        />
      )}

      {isImageModalOpen && (
         <ImageModal
          image={selectedImage}
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
        />
      )}
    </div>
    </div>

  );
};

export default ProjectsCarousel;
