'use client'
import Link from 'next/link';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiSun, FiMoon } from 'react-icons/fi';
import { AiOutlineLinkedin, AiOutlineGithub, AiOutlineMail } from 'react-icons/ai';


const Header = ({darkMode, toggleTheme}) => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className={`fixed top-0 w-full ${darkMode ? 'bg-gray-800 text-white border-b border-gray-700' : 'bg-white text-black border-b'} z-50 h-16 flex items-center justify-between px-4 sm:px-8`}>
        <div className={`fixed top-0 left-0 w-80 h-full ${darkMode ? 'bg-gray-800  text-white' : 'bg-white text-black'} text-base-content transform transition-transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"} z-50 p-4 flex flex-col`}>
        <ul className=" overflow-y-auto h-full pt-20 flex flex-col items-center space-y-8 ">
          <li className={`w-full rounded ${pathname === '/' ? 'bg-gray-300 text-black' : ''}`}><Link href="/"><p className=" w-full text-center py-1 hover:bg-gray-200 hover:text-black">Home</p></Link></li>
          <li className={`w-full rounded ${pathname === '/explore' ? 'bg-gray-300 text-black' : ''}`}><Link href="/explore"><p className="block w-full text-center py-1 hover:bg-gray-200 hover:text-black">Explore Apps</p></Link></li>
          <li className={`w-full rounded ${pathname === '/resume' ? 'bg-gray-300 text-black' : ''}`}><Link href="/resume"><p className="block w-full text-center py-1 hover:bg-gray-200 hover:text-black">Resume</p></Link></li>
          <li className={`w-full rounded ${pathname === '/projects' ? 'bg-gray-300 text-black' : ''}`}><Link href="/projects"><p className="block w-full text-center py-1 hover:bg-gray-200 hover:text-black">Projects</p></Link></li>
          <li className={`w-full rounded ${pathname === '/blogs' ? 'bg-gray-300 text-black' : ''}`}><Link href="/blogs"><p className="block w-full text-center py-1 hover:bg-gray-200 hover:text-black">Blogs</p></Link></li>
          <li className={`w-full rounded ${pathname === '/vote' ? 'bg-gray-300 text-black' : ''}`}><Link href="/vote"><p className="block w-full text-center py-1 hover:bg-gray-200 hover:text-black">Vote/Submit an Idea</p></Link></li>
          <button className="btn mt-4 w-full bg-blue-800 text-white p-2 border-black" onClick={() => setDrawerOpen(false)}>Close</button>
        </ul>
          <div className="flex justify-evenly items-center w-full pb-4">
            <a href="https://www.linkedin.com/in/randyclee" target="_blank" className={`flex items-center justify-center w-12 h-12 border rounded-full transition-colors duration-300 ${darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
              <AiOutlineLinkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com/randyclee" target="_blank" className={`flex items-center justify-center w-12 h-12 border rounded-full transition-colors duration-300 ${darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
              <AiOutlineGithub className="w-6 h-6" />
            </a>
            <a href="mailto:randy.c.lee2@gmail.com" className={`flex items-center justify-center w-12 h-12 border rounded-full transition-colors duration-300 ${darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
              <AiOutlineMail className="w-6 h-6" />
            </a>
          </div>
          
        </div>

        {/* Burger Button */}
        <button onClick={() => setDrawerOpen(!drawerOpen)} className={`z-50 text-4xl pl-4 `}>☰</button>

        <div className="z-0 hidden md:flex justify-end">
          <span className="text-xl font-bold text-center">RANDY LEE</span>
        </div>

        <button
            onClick={toggleTheme}
            className={`flex items-center border rounded-lg px-4 py-2 lg:mx-8 mx-2 transition-colors duration-300 ${
              darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'
            }`}
            style={{ zIndex: 1 }}
          >
            {darkMode ? (
              <>
                <FiSun className="w-6 h-6" />
              </>
            ) : (
              <>
                <FiMoon className="w-6 h-6" />
              </>
            )}
          </button>

      </header>
      {drawerOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setDrawerOpen(false)}></div>}
    </>
  );
};

export default Header;
