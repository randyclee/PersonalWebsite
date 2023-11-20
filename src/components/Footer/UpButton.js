import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

const Footer = ({ onScrollToTop, isButtonVisible, darkMode }) => {
  return (
    <div className={`fixed bottom-8 right-8 z-10 transition-opacity duration-300 ${isButtonVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button
        onClick={onScrollToTop}
        className={`flex items-center justify-center p-3 px-5 rounded-full border focus:outline-none shadow-lg cursor-pointer 
            ${isButtonVisible ? '' : 'pointer-events-none'}
            ${darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}
        `}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="animate-bounce-up text-xl" />
      </button>
    </div>
  );
};

export default Footer;
