// components/ProjectDetailsModal.js
import React, { useState } from 'react';
import Image from 'next/image';
import ImageModal from '@/components/ImageModal'; // Import the ImageModal component


const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  if (!isOpen || !project) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const closeImageModal = (e) => {
    e.stopPropagation();
    setIsImageModalOpen(false);
  };


  return (
    <div style={{ zIndex: 50 }} className="fixed pt-5 inset-0 bg-black bg-opacity-70 overflow-y-auto h-full w-full flex items-center justify-center" onClick={onClose}>
      <div className="relative p-5 border w-11/12 md:max-w-3xl mx-auto max-h-[80vh] overflow-y-auto shadow-lg rounded-md bg-white" onClick={handleModalClick}>
        <button onClick={onClose} className="absolute top-0 left-0 text-2xl text-black rounded-full p-2 m-2">
          &times;
        </button>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 text-center mb-4">
          {project.title}
        </h3>

        <div className="space-y-6">

        <div className="flex flex-col space-y-4">
          {['Description', 'Achievements', 'Considerations', "Improvements", 'Tags'].map((heading, index) => (
            <div key={heading} className="bg-white p-4 rounded-lg shadow-lg">
              <h5 className="font-bold text-gray-900">{heading}</h5>
              {heading === 'Tags' ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : heading === 'Achievements' ? (
                <ul className="list-disc pl-5 text-gray-700">
                  {project.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">{project[heading.toLowerCase().replace(/\s/g, '')]}</p>
              )}
            </div>
          ))}
        </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {project.images.map((image, index) => (
              <div key={index} className="rounded-lg shadow-lg cursor-pointer"  onClick={() => openImageModal(image)}>
                <Image height={800} width={500} src={`${process.env.APP_URL}${image}`} alt={`Project ${project.title} image ${index}`} width={100} height={100} layout="responsive" className="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isImageModalOpen && (
        <ImageModal
          image={selectedImage}
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
        />
      )}
    </div>
  );
};

export default ProjectDetailsModal;
