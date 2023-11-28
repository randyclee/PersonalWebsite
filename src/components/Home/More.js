import { FaLightbulb, FaPenFancy, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const ActionButtons = ({darkMode}) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
    <div className={`flex flex-col items-center pt-20 pb-24`} >
      <h2 className="text-3xl font-bold mb-8 text-center">
        Check Out More of the Website!
      </h2>

      <div className="flex flex-wrap justify-around gap-10 mt-4 w-full max-w-4xl">
        <Link href="/explore" passHref>
          <p className={`btn flex hover:border-black border-black flex-col items-center transform hover:scale-105 focus:scale-105 focus:outline-none transition duration-300 hover:bg-blue-600 font-bold py-3 px-5 rounded-lg w-48 h-36 justify-center text-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}>
            <FaSearch className="mb-2" size={24} />
            Explore
          </p>
        </Link>

        <Link href="/blogs" passHref>
          <p className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} btn flex flex-col hover:border-black border-black items-center transform hover:scale-105 focus:scale-105 focus:outline-none transition duration-300 hover:bg-green-600 font-bold py-3 px-5 rounded-lg w-48 h-36 justify-center text-lg`}>
            <FaPenFancy className="mb-2" size={24} />
            Blogs
          </p>
        </Link>

        <Link href="/vote" passHref>
          <p className={`btn flex flex-col hover:border-black border-black items-center transform hover:scale-105 focus:scale-105 focus:outline-none transition duration-300 hover:bg-yellow-600 font-bold py-3 px-5 rounded-lg w-48 h-36 justify-center text-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}>
            <FaLightbulb className="mb-2" size={24} />
            Vote/Submit Idea
          </p>
        </Link>

        <Link href="/projects" passHref>
          <p className={`btn flex flex-col hover:border-black border-black items-center transform hover:scale-105 focus:scale-105 focus:outline-none transition duration-300 hover:bg-red-600 font-bold py-3 px-5 rounded-lg w-48 h-36 justify-center text-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}>
            <FaLightbulb className="mb-2" size={24} />
            Projects
          </p>
        </Link>
      </div>
    </div>
    </div>

  );
};

export default ActionButtons;
