import { useState } from 'react';
import { FiX } from 'react-icons/fi'; 

function ProjectSubmissionModal({ isOpen, onClose, onSubmit, darkMode }) {
    const [toast, setToast] = useState({ show: false, message: '' });

  const [submission, setSubmission] = useState({
    submitterName: '',
    projectName: '',
    description: '',
    useCase: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubmission({ ...submission, [name]: value });
  };

  const closeToast = () => {
    setToast({ show: false, message: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(submission);
    setSubmission({
      submitterName: '',
      projectName: '',
      description: '',
      useCase: '',
    });
    setToast({ show: true, message: 'Project submitted successfully!' });
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
                <input type="text" id="projectName" name="projectName" className={`textarea ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`}  value={submission.projectName} onChange={handleInputChange} required />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="description">
                  <span className={`label-text ${darkMode? "bg-gray-800 text-white":"bg-white text-black"}`} >Description</span>
                </label>
                <textarea id="description" name="description" className={`textarea ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`} value={submission.description} onChange={handleInputChange} required />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="useCase">
                  <span className={`label-text ${darkMode? "bg-gray-800 text-white":"bg-white text-black"}`} >Use Case</span>
                </label>
                <textarea id="useCase" name="useCase" className={`textarea ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`} value={submission.useCase} onChange={handleInputChange} required />
              </div>
              <div className="modal-action justify-between">
                <button className={`btn btn-outline ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`}  onClick={() => onClose()}>Cancel</button>
                <button className={`btn btn-outline ${darkMode? "bg-gray-800 text-white border-gray-500":"bg-white text-black border-black"}`}  type="submit">Submit</button>
              </div>
            </form>
          </div>
          {toast.show && (
            <div className="toast">
            <div className="alert alert-success">
                <div>
                <span>{toast.message}</span>
                </div>
                <div className="flex-none">
                <button className="btn btn-sm btn-ghost" onClick={() => closeToast}>Close</button>
                </div>
            </div>
            </div>
        )}
        </div>
  );
}

export default ProjectSubmissionModal;
