import React from 'react';
import Image from 'next/image';

const ImageModal = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 "
      style={{ zIndex: 100 }}
      onClick={onClose}
    >
      <div onClick={onClose} className="relative bg-white shadow-lg" >
        <button  className="absolute -top-[5vh] -left-[5vw] text-2xl text-white rounded-full px-2">
          &times; 
        </button>
        <div style={{ maxHeight: '80vh' }}>
          <img 
            src={image} 
            alt="Project Image" 
            layout="intrinsic" 
            width={800} 
            height={600} 
            objectFit="contain" 
            objectPosition="center"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
