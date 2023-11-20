import React, { useState, useEffect } from 'react';
import ImageModal from '@/components/ImageModal';
import { FiX } from 'react-icons/fi';
import { createProject, deleteImage, updateProject } from '@/services/api/projectsApi';

const ProjectModal = ({ isOpen, onClose, onSubmit, isNew, project }) => {
  const initialProjectData = {
    title: '',
    mainImage: '/uploads/randy_lee_logo.png',
    tags: [],
    achievements: '',
    description: '',
    improvements: '',
    resumePoints: [],
    takeaways: '',
    resumeHeading:"",
    year:2023,
    images: [],
    inResume:false,
    highlight:false
  };

  const [projectData, setProjectData] = useState(initialProjectData);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const [mainImagePreview, setMainImagePreview] = useState('');
  const [imagesPreview, setImagesPreview] = useState([]);


  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProjectData({ ...projectData, [name]: checked });
  };
  
  const handleImageChange = (e, isMainImage = false) => {
    const file = e.target.files[0];
    if (!file) return;  // Early exit if no file is selected
  
    if (isMainImage) {
      setProjectData({ ...projectData, mainImage: file });
      setMainImagePreview(URL.createObjectURL(file));
    } else {
      setProjectData(prev => ({
        ...prev, 
        images: [...prev.images, file]
      }));
      setImagesPreview(prev => [...prev, URL.createObjectURL(file)]);
    }
  };
  

  const handleDeleteImage = (e, imageIndex, isMainImage = false) => {
    e.preventDefault(); 
    e.stopPropagation(); 
  
    if (window.confirm("Are you sure you want to delete this image?")) {
      let updatedProjectData = { ...projectData };
  
      if (isMainImage) {
        updatedProjectData.mainImage = '/uploads/randy_lee_logo.png';
        setMainImagePreview('/uploads/randy_lee_logo.png');
      } else {
        updatedProjectData.images = updatedProjectData.images.filter((_, index) => index !== imageIndex);
        setImagesPreview(prev => prev.filter((_, index) => index !== imageIndex));
      }
  
      if (updatedProjectData.images.length === 0) {
        updatedProjectData.images = [];
      }
  
      setProjectData(updatedProjectData);
    }
  };
  

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };


  useEffect(() => {
    if (project) {
      setProjectData(project);
      if (project.mainImage) {
        setMainImagePreview(process.env.APP_URL + project.mainImage);
      } else {
        setMainImagePreview('');
      }
  
      if (project.images && project.images.length > 0) {
        setImagesPreview(project.images.map(image => `${process.env.APP_URL}${image}`));
      } else {
        setImagesPreview([]);
      }
    } else {
      setProjectData(initialProjectData);
      setMainImagePreview('');
      setImagesPreview([]);
    }
  }, [project]);
  

  const handleDescriptionChange = (index, value) => {
    const newResumePoints = [...projectData.resumePoints];
    newResumePoints[index] = value;
    setProjectData({ ...projectData, resumePoints: newResumePoints });
  };

  const handleAddDescription = () => {
    setProjectData({ ...projectData, resumePoints: [...projectData.resumePoints, ''] });
  };

  const handleRemoveDescription = (index) => {
    const filteredResumePoints = projectData.resumePoints.filter((_, idx) => idx !== index);
    setProjectData({ ...projectData, resumePoints: filteredResumePoints });
  };


  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setProjectData({ ...projectData, tags });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleClose = () => {
    if (window.confirm("Are you sure you want to close without saving?")) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!projectData.title || !projectData.resumeHeading || !projectData.tags || !projectData.description || !projectData.achievements || !projectData.takeaways || !projectData.improvements || !projectData.year || !projectData.resumePoints ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (window.confirm("Are you sure you want to save these changes?")) {
      const formData = new FormData();

      // Handle main image
      if (projectData.mainImage instanceof File) {
        formData.append('mainImage', projectData.mainImage);
      } else {
        formData.append('originalMainImage', projectData.mainImage); // original main image URL
      }

      // Append new images and existing images URLs
      projectData.images.forEach(image => {
        if (image instanceof File) {
          formData.append('images', image); // new image file
        } else {
          formData.append('originalImages', image); // existing image URL
        }
      });

      // Append other fields
      Object.keys(projectData).forEach(key => {
        if (key === 'tags' || key === 'resumePoints') {
          projectData[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else if (key !== 'images' && key !== 'mainImage') {
          formData.append(key, projectData[key]);
        }
      });

      try {
        let response;
        // Assuming 'updateProject' sends a POST request with 'formData'
        if(isNew){
          response = await createProject(formData);
        }else{
          response = await updateProject(projectData._id, formData);
        }
        
        if (response) {
          onSubmit();
        }
      } catch (error) {
        console.error("Error updating project:", error);
        alert("Failed to update project.");
      }
    }
  };
  
  
  
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-white text-black border-black">
      <button onClick={onClose} className="btn btn-sm text-red-600 bg-white btn-circle absolute left-2 top-2">
          <FiX />
        </button>
        <h3 className="font-bold text-lg text-center">Edit Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" name="title" value={projectData.title} onChange={handleInputChange} className="input input-bordered bg-white text-black border-black" required />
          </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Main Image</span>
          </label>
          <input type="file" onChange={(e) => handleImageChange(e, true)} id="mainImage" className="hidden" />
          {mainImagePreview && (
            <div className="mt-2">
              <img src={mainImagePreview} onClick={() => handleImageClick(mainImagePreview)} alt="Main Image Preview" className="h-40 w-auto rounded" />
              <button className="btn btn-error btn-xs" onClick={(e) => handleDeleteImage(e, projectData.mainImage, true)}>Delete</button>
            </div>
          )}
              <label
                htmlFor="mainImage"
                className="btn btn-outline btn-sm mt-2"
              >
                Change Image
              </label>
        </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tags (comma separated)</span>
            </label>
            <input type="text" name="tags" value={projectData.tags.join(', ')} onChange={handleTagChange} className="input input-bordered bg-white text-black border-black" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea name="description" value={projectData.description} onChange={handleInputChange} className="textarea textarea-bordered bg-white text-black border-black" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Achievements</span>
            </label>
            <input type="text" name="achievements" value={projectData.achievements} onChange={handleInputChange} className="input input-bordered bg-white text-black border-black" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Takeaways</span>
            </label>
            <input type="text" name="takeaways" value={projectData.takeaways} onChange={handleInputChange} className="input input-bordered bg-white text-black border-black" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Improvements</span>
            </label>
            <input type="text" name="improvements" value={projectData.improvements} onChange={handleInputChange} className="input input-bordered bg-white text-black border-black" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Resume Heading</span>
            </label>
            <input type="text" name="resumeHeading" value={projectData.resumeHeading} onChange={handleInputChange} className="input input-bordered bg-white text-black border-black" required />
          </div>
          
          <div className="form-control">
          <label className="label">
            <span className="label-text">Year</span>
          </label>
          <input
            type="number"
            name="year"
            value={projectData.year}
            onChange={handleInputChange}
            className="input input-bordered bg-white text-black border-black"
            required
          />
        </div>
          <div className="form-control">
        <label className="label">
          <span className="label-text -mb-3">Resume Points</span>
        </label>
        {projectData.resumePoints.map((desc, index) => (
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
          Add Points
        </button>
      </div>
      <div className="form-control mt-2">
            <label className="label cursor-pointer">
              <span className="label-text">In Resume</span>
              <input 
                name = "inResume"
                type="checkbox" 
                checked={projectData.inResume} 
                onChange={handleCheckboxChange} 
                className="checkbox checkbox-accent" 
              />
            </label>
          </div>
          <div className="form-control mt-2">
            <label className="label cursor-pointer">
              <span className="label-text">Is Highlight</span>
              <input 
                name = "highlight"
                type="checkbox" 
                checked={projectData.highlight} 
                onChange={handleCheckboxChange} 
                className="checkbox checkbox-accent" 
              />
            </label>
          </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Additional Images</span>
          </label>
          <div className="mt-2 flex gap-2">
            {imagesPreview.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} onClick={() => handleImageClick(image)} alt={`Preview ${index}`} className="h-20 w-auto rounded" />
                <button className="btn btn-error btn-xs absolute -top-2 -right-2" onClick={(e) => handleDeleteImage(e, index)}>×</button>
              </div>
            ))}
            {projectData.images.length < 4 && (
              <label
                htmlFor="additionalImage"
                className="btn btn-outline btn-sm mt-2"
              >
                Add Image
                <input
                  type="file"
                  accept="image/*"
                  id="additionalImage"
                  name="additionalImage"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
          <div className="modal-action">
            <button className="btn" onClick={handleClose}>Cancel</button>
            <button className="btn" type="submit">Save</button>
          </div>
        </form>
        <ImageModal isOpen={showImageModal} image={selectedImage} onClose={() => setShowImageModal(false)} />
      </div>
    </div>
  );
};

export default ProjectModal;
