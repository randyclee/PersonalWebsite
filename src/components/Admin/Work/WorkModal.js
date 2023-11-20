import React, { useState, useEffect } from 'react';
import ImageModal from '@/components/ImageModal';
import { FiX } from 'react-icons/fi';
import { createWork, updateWork } from '@/services/api/workSectionApi';

const WorkModal = ({ isOpen, onClose, work, isNew }) => {
  const initialWorkData = {
    logo: '',
    company: '',
    title: '',
    subheadings: [],
    tags: [],
    time: '',
    location: '', // New location field
    inResume:false,
    description: [], // Description as an array of strings
  };

  const [workData, setWorkData] = useState(initialWorkData);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setWorkData({ ...workData, [name]: checked });
  };

  useEffect(() => {
    if (work) {
      setWorkData(work);
      setPreviewImage(process.env.APP_URL+work.logo); 
    } else {
      setWorkData(initialWorkData);
      setPreviewImage(null);
    }
  }, [work]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkData({ ...workData, [name]: value });
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim());
    setWorkData({ ...workData, tags });
  };


  const handleSubheadingChange = (index, value) => {
    const newSubheadings = [...workData.subheadings];
    newSubheadings[index] = value;
    setWorkData({ ...workData, subheadings: newSubheadings });
  };

  const handleAddSubheading = () => {
    setWorkData({ ...workData, subheadings: [...workData.subheadings, ''] });
  };

  const handleRemoveSubheading = (index) => {
    const filteredSubheadings = workData.subheadings.filter((_, idx) => idx !== index);
    setWorkData({ ...workData, subheadings: filteredSubheadings });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setWorkData({ ...workData, logo:file });
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl); 
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...workData.description];
    newDescriptions[index] = value;
    setWorkData({ ...workData, description: newDescriptions });
  };

  const handleAddDescription = () => {
    setWorkData({ ...workData, description: [...workData.description, ''] });
  };

  const handleRemoveDescription = (index) => {
    const filteredDescriptions = workData.description.filter((_, idx) => idx !== index);
    setWorkData({ ...workData, description: filteredDescriptions });
  };


  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleClose = () => {
    if (window.confirm('Are you sure you want to close without saving?')) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to save these changes?')) {

      const formData = new FormData();
      Object.keys(workData).forEach(key => {
        if (key === 'subheadings' || key === 'tags' || key === 'description') {
          workData[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        }  else if (key === 'inResume') {
          formData.append(key, workData[key].toString());
        }
        else {
          formData.append(key, workData[key]);
        }
      });


      let response;
      if (isNew) {
        response = await createWork(formData);
      } else {
        response = await updateWork(work._id, formData);
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-white text-black border-black">
        <button
          onClick={handleClose}
          className="btn btn-sm text-red-600 bg-white btn-circle absolute left-2 top-2"
        >
          <FiX />
        </button>
        <h3 className="font-bold text-lg text-center">Edit Work History</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control justify-center text-center">
            <label className="label flex">
              <span className="label-text text-center">Logo</span>
            </label>
            <input
              type="file"
              accept="image/*" 
              onChange={(e) => handleImageChange(e)}
              className="hidden" 
              id="logo"
              name="logo"
            />
            {previewImage && (
              <div>
                <div className="mt-2 flex justify-center">
                  <img
                    src={previewImage}
                    alt="Logo"
                    className="h-40 w-auto rounded cursor-pointer justify-center "
                    onClick={() => handleImageClick(previewImage)}
                  />
                </div>
              </div>
            )}
              <label
                htmlFor="logo"
                className="btn btn-outline btn-sm mt-2"
              >
              Change Logo
            </label>

          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text">Company</span>
            </label>
            <input
              type="text"
              name="company"
              value={workData.company}
              onChange={handleInputChange}
              className="input input-bordered bg-white text-black border-black"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={workData.title}
              onChange={handleInputChange}
              className="input input-bordered bg-white text-black border-black"
              required
            />
          </div>

          <div className="form-control mt-2">
            <label className="label cursor-pointer">
              <span className="label-text">In Resume</span>
              <input 
                name = "inResume"
                type="checkbox" 
                checked={workData.inResume} 
                onChange={handleCheckboxChange} 
                className="checkbox checkbox-accent" 
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Subheadings</span>
            </label>
            {workData.subheadings.map((subheading, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={subheading}
                  onChange={(e) => handleSubheadingChange(index, e.target.value)}
                  className="mt-2 input border bg-white text-black border-black flex-1 mr-2"
                />
                <button
                  type="button" 
                  className="btn btn-error btn-xs"
                  onClick={() => handleRemoveSubheading(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button" 
              className="btn btn-outline btn-sm mt-2"
              onClick={handleAddSubheading}
            >
              Add Subheading
            </button>
          </div>

          <div className="form-control">
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          type="text"
          name="location"
          value={workData.location}
          onChange={handleInputChange}
          className="input input-bordered bg-white text-black border-black"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text -mb-3">Description</span>
        </label>
        {workData.description.map((desc, index) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              value={desc}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              className="mt-2 input border bg-white text-black border-black flex-1 mr-2"
            />
            <button
              type="button" 
              className="btn btn-error btn-xs"
              onClick={() => handleRemoveDescription(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button" 
          className="btn btn-outline btn-sm mt-2"
          onClick={handleAddDescription}
        >
          Add Description
        </button>
      </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tags (comma separated)</span>
            </label>
            <input
              type="text"
              name="tags"
              value={workData.tags.join(', ')}
              onChange={handleTagChange}
              className="input input-bordered bg-white text-black border-black"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <input
              type="text"
              name="time"
              value={workData.time}
              onChange={handleInputChange}
              className="input input-bordered bg-white text-black border-black"
              required
            />
          </div>


          <div className="modal-action">
            <button className="btn" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn" type="submit">
              Save
            </button>
          </div>
        </form>
        <ImageModal
          isOpen={showImageModal}
          image={selectedImage}
          onClose={() => setShowImageModal(false)}
        />
      </div>
    </div>
  );
};

export default WorkModal;
