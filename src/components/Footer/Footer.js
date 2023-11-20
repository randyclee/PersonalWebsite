import React from 'react';
import Link from 'next/link'

const Footer = ({darkMode}) => {
  return (
    <footer className={`text-center py-6 ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black border-t'}`}>
      <div className="container mx-auto px-4 ">
        <div className="flex flex-wrap justify-between py-6">
          <div className="w-full sm:w-auto mb-6 sm:mb-0">
            <h3 className=" text-lg font-semibold mb-4">Follow Me</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.linkedin.com/in/randyclee/" target="_blank" className=" hover:text-white transition duration-300">
                  Linkedin
                </Link>
              </li>
              <li>
                <Link href="https://github.com/randyclee" target="_blank" className=" hover:text-white transition duration-300">
                  Github
                </Link>
              </li>
              
              
            </ul>
            </div>

          <div className="w-full sm:w-auto mb-6 sm:mb-0">
          <h3 className="text-lg font-semibold mb-4">More To Do</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className=" hover:text-white transition duration-300">
                  Explore Apps
                </Link>
              </li>
              <li>
                <Link href="/vote" className=" hover:text-white transition duration-300">
                  Vote/Submit an Idea
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-auto">
            <h3 className=" text-lg font-semibold mb-4">Learn More</h3>
            <ul className="space-y-2">
                <li>
                    <Link href="/blogs" className=" hover:text-white transition duration-300">
                    Blogs
                    </Link>
                </li>
                <li>
                    <Link href="/resume" className=" hover:text-white transition duration-300">
                    Resume
                    </Link>
                </li>
            </ul>
            
          </div>
        </div>

        <div className="hidden sm:block mt-8 text-center">
          <p>Made by Randy Lee using Next.js and Tailwindcss</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
