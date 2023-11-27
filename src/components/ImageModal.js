import React from 'react';

const ImageModal = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center p-4"
      style={{ zIndex: 100 }}
      onClick={onClose}
    >
      <div onClick={(e) => onClose} className="relative bg-white shadow-lg overflow-auto" style={{ maxHeight: '80vh', maxWidth: '90vw' }}>
        <button onClick={onClose} className="absolute top-4 left-4 text-2xl text-black bg-white rounded-full p-2">
          &times;
        </button>
        <img 
          src={`${process.env.APP_URL}${image}`} 
          alt="Project Image" 
          style={{ maxHeight: '100%', maxWidth: '100%', display: 'block', margin: 'auto' }}
        />
      </div>
    </div>
  );
};

export default ImageModal;

