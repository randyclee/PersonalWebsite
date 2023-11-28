import React from 'react';
import Image from 'next/image';

const ImageModal = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="relative shadow-lg overflow-auto max-h-[80vh] max-w-[90vw] p-4"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 text-2xl text-black rounded-full p-2 focus:outline-none"
        >
          &times;
        </button>
        <Image
          width={1200}
          height={1600} 
          src={`${process.env.APP_URL}${image}`} 
          alt="Project Image" 
          className="max-h-full max-w-full block m-auto"
        />
      </div>
    </div>
  );
};

export default ImageModal;
