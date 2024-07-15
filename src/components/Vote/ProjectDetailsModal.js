import { FiX } from 'react-icons/fi'; 
import Image from 'next/image';


function ProjectDetailsModal({ isOpen, onClose, selectedProject, darkMode }) {
  if (!isOpen || !selectedProject) return null;

  return (
    <div className="modal modal-open">
      

      <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} modal-box relative`}>
      <button
            onClick={onClose}
            className="fixed top-0 left-0 text-red-600 rounded-full p-2 focus:outline-none"
            aria-label="Close"
          >
          <FiX size={24} />
        </button>
        <h3 className="font-bold text-lg text-center">{selectedProject.name}</h3>
        <p className="text-center text-sm mt-1">{`Submitted by ${selectedProject.submitter || 'Anonymous'}`}</p>
        <figure>
          <Image width={500} height={800} className="w-full h-64 object-cover mt-4" src={`${process.env.APP_URL}${selectedProject.imageUrl}`} alt="Project" />
        </figure>
        <div className="py-4 space-y-4">
          <div className="shadow p-3">
            <h4 className="font-bold">Description</h4>
            <p>{selectedProject.description}</p>
          </div>

          <div className="shadow p-3">
            <h4 className="font-bold">How would it Benefit the User?</h4>
            <p>{selectedProject.businessUseCase}</p>
          </div>
          <div className="modal-action">
            <button className="mt-4 justify-center rounded-full bg-gray-800 py-2 px-4 text-white" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsModal;
