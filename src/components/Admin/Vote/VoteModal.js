import { useState, useEffect } from 'react';
import ImageModal from '@/components/ImageModal';
import { FiX } from 'react-icons/fi';
import { createVote, updateVote } from '@/services/api/voteApi';

function VoteModal({ isOpen, onClose, vote, isNew }) {
  const [voteData, setVoteData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    votes: 0,
    businessUseCase: '',
    workInProgress: false,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  useEffect(() => {
    if (vote) {
      setVoteData(vote);
      setPreviewImage(process.env.APP_URL+vote.imageUrl);
    } else {
      setVoteData({
        name: '',
        description: '',
        imageUrl: '',
        votes: 0,
        businessUseCase: '',
        workInProgress: false
      });
      setPreviewImage(null);
    }
  }, [vote]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoteData({ ...voteData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVoteData({ ...voteData, imageUrl:file });
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to save these changes?')) {

      const formData = new FormData();
      Object.keys(voteData).forEach(key => {
          formData.append(key, voteData[key]);
      });

      let response;
      if (isNew) {
        response = await createVote(formData);
      } else {
        response = await updateVote(vote._id, formData);
      }
      onClose();
    }
  };

  const handleCheckboxChange = () => {
    setVoteData({ ...voteData, workInProgress: !voteData.workInProgress });
  };


  if (!isOpen) return null;

  return (
    <div className={`modal modal-open bg-white text-black`}>
      <div className="modal-box bg-white text-black">
      <button onClick={onClose} className="btn btn-sm text-red-600 bg-white btn-circle absolute left-2 top-2">
          <FiX />
        </button>
        <h3 className="font-bold text-lg text-center">Edit Vote</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name="name" value={voteData.name} onChange={handleInputChange} className="input input-bordered bg-white text-black border-black" required />
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea name="description" value={voteData.description} onChange={handleInputChange} className="textarea textarea-bordered bg-white text-black border-black" required />
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input type="file" onChange={(e) => handleImageUpload(e)} id="vote" className="hidden" />
            {previewImage && (
              <div className="mt-2 flex justify-center">
                <img src={previewImage}  onClick={() => handleImageClick(previewImage)} alt="Vote" className="h-40 w-auto rounded flex justify-center" />
              </div>
            )}
                <label
                  htmlFor="vote"
                  className="btn btn-outline btn-sm mt-2"
                >
                  Change Image
                </label>
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Business Use Case</span>
            </label>
            <textarea name="businessUseCase" value={voteData.businessUseCase} onChange={handleInputChange} className="textarea textarea-bordered bg-white text-black border-black" required />
          </div>
          <div className="form-control mt-2">
            <label className="label cursor-pointer">
              <span className="label-text">Work In Progress</span>
              <input 
                type="checkbox" 
                checked={voteData.workInProgress} 
                onChange={handleCheckboxChange} 
                className="checkbox checkbox-accent" 
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Votes</span>
            </label>
            <input type="number" name="votes" value={voteData.votes} onChange={handleInputChange} className="input input-bordered bg-white text-black border-black" min="0" />
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
}

export default VoteModal;
