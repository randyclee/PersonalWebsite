import { useState } from 'react';
import { createVote } from '@/services/api/voteApi';
import { FiX } from 'react-icons/fi'; 

function ProjectSubmissionModal({ isOpen, onClose, onSubmit, darkMode }) {
  const [submission, setSubmission] = useState({
    name: '',
    submitterName: '', 
    description: '',
    imageUrl: '',
    businessUseCase: '',
    workInProgress: false,
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubmission({ ...submission, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(submission).forEach(key => {
        formData.append(key, submission[key]);
    });

    console.log("Form data being sent:", formData); // Debugging line

    const response = await createVote(formData);
    onSubmit();
    onClose(); 

  };
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
       
          <div className={`modal-box ${darkMode? "bg-gray-800 text-white":"bg-white text-black"}`}>
          <button
            onClick={onClose}
            className="fixed top-0 left-0 text-red-600 rounded-full p-2 focus:outline-none"
            aria-label="Close"
          >
          <FiX size={24} />
        </button>
            <h3 className="font-bold text-lg text-center mb-2">Submit a Project</h3>
            <form onSubmit={handleSubmit} >
              <div className="form-control">
                <label className="label"  htmlFor="submitterName">
                  <span className={`label-text ${darkMode? "bg-gray-800 text-white":"bg-white text-black"}`} >Submitter Name</span>
                </label>
                <input type="text" id="submitterName" name="submitterName" className={`textarea ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`} value={submission.submitterName} onChange={handleInputChange} required />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="projectName">
                  <span className={`label-text ${darkMode? "bg-gray-800 text-white":"bg-white text-black"}`} >Project Name</span>
                </label>
                <input type="text" id="projectName" name="name" className={`textarea ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`}  value={submission.name} onChange={handleInputChange} required />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="description">
                  <span className={`label-text ${darkMode? "bg-gray-800 text-white":"bg-white text-black"}`} >Description</span>
                </label>
                <textarea id="description" name="description" className={`textarea ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`} value={submission.description} onChange={handleInputChange} required />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="businessUseCase">
                  <span className={`label-text ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>How would it Benefit the User?</span>
                </label>
                <textarea id="businessUseCase" name="businessUseCase" className={`textarea ${darkMode ? "bg-gray-800 text-white border-gray-500" : "bg-white text-black border-black"}`} value={submission.businessUseCase} onChange={handleInputChange} required />
              </div>

              <div className="modal-action justify-between">
                <button className={`btn btn-outline ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`}  onClick={() => onClose()}>Cancel</button>
                <button className={`btn btn-outline ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`}  type="submit">Submit</button>
              </div>
            </form>
          </div>
     
        </div>
  );
}

export default ProjectSubmissionModal;
