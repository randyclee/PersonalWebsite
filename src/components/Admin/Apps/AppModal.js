import React, { useState, useEffect } from 'react';
import ImageModal from '@/components/ImageModal';
import { FiX } from 'react-icons/fi';
import { createApp, updateApp } from '@/services/api/appApi';

const AppModal = ({ isOpen, onClose, isNew, app }) => {
  const initialAppData = {
    title: '',
    description: '',
    image: '',
    link: '',
    tags: [],
    hearts: 0
  };

  const [appData, setAppData] = useState(initialAppData);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (app) {
      setAppData(app);
      setPreviewImage(process.env.APP_URL+app.image);
    } else {
      setAppData(initialAppData);
      setPreviewImage(null);
    }
  }, [app]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppData({ ...appData, [name]: value });
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setAppData({ ...appData, tags });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setAppData({ ...appData, image: file });
    setPreviewImage(imageUrl); 
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to save these changes?')) {

      const formData = new FormData();
      Object.keys(appData).forEach(key => {
        if (key === 'tags') {
          appData[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, appData[key]);
        }
      });

      let response;
      if (isNew) {
        response = await createApp(formData);
      } else {
        response = await updateApp(app._id, formData);
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-white text-black border-black">
        <button onClick={onClose} className="btn btn-sm text-red-600 bg-white btn-circle absolute left-2 top-2">
          <FiX />
        </button>
        <h3 className="font-bold text-lg text-center">Edit App</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" name="title" value={appData.title} onChange={handleInputChange} className="input input-bordered bg-white text-black border-black" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea name="description" value={appData.description} onChange={handleInputChange} className="textarea textarea-bordered bg-white text-black border-black" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              accept="image/*" // Restrict to image files only
              onChange={handleImageChange}
              className="hidden" // Hide the file input
              id="imageInput"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="App Image"
                  className="h-40 w-auto rounded cursor-pointer"
                  onClick={() => handleImageClick(previewImage)}
                />
              </div>
            )}
            <label
              htmlFor="imageInput"
              className="btn btn-outline btn-sm mt-2"
            >
              Change Image
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Link</span>
            </label>
            <input type="text" name="link" value={appData.link} onChange={handleInputChange} className="input input-bordered bg-white text-black border-black" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tags (comma separated)</span>
            </label>
            <input type="text" name="tags" value={appData.tags.join(', ')} onChange={handleTagChange} className="input input-bordered bg-white text-black border-black" required />
          </div>

          <div className="modal-action">
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn" type="submit">Save</button>
          </div>
        </form>
        <ImageModal isOpen={showImageModal} image={selectedImage} onClose={() => setShowImageModal(false)} />
      </div>
    </div>
  );
};

export default AppModal;
