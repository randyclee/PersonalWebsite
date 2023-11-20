import { FaLightbulb, FaPenFancy, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const ActionButtons = ({darkMode}) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
    <div className={`flex flex-col items-center pt-20 pb-24`} >
      {/* Title */}
      <h2 className="text-3xl font-bold mb-8 text-center">
        Check Out More of the Website!
      </h2>

      {/* Buttons container */}
      <div className="flex flex-wrap justify-around gap-4 mt-4 w-full max-w-4xl">
        {/* Discover Button */}
        <Link href="/discover" passHref>
          <p className="btn flex hover:border-black border-black flex-col items-center transform hover:scale-105 focus:scale-105 focus:outline-none transition duration-300 bg-blue-800 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-lg w-48 h-36 justify-center text-lg">
            <FaSearch className="mb-2" size={24} />
            Discover
          </p>
        </Link>

        {/* Blogs Button */}
        <Link href="/blogs" passHref>
          <p className="btn flex flex-col hover:border-black border-black items-center transform hover:scale-105 focus:scale-105 focus:outline-none transition duration-300 bg-green-800 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-lg w-48 h-36 justify-center text-lg">
            <FaPenFancy className="mb-2" size={24} />
            Blogs
          </p>
        </Link>

        {/* Vote/Submit Idea Button */}
        <Link href="/vote" passHref>
          <p className="btn flex flex-col hover:border-black border-black items-center transform hover:scale-105 focus:scale-105 focus:outline-none transition duration-300 bg-yellow-800 hover:bg-yellow-600 text-white font-bold py-3 px-5 rounded-lg w-48 h-36 justify-center text-lg">
            <FaLightbulb className="mb-2" size={24} />
            Vote/Submit Idea
          </p>
        </Link>
      </div>
    </div>
    </div>

  );
};

export default ActionButtons;
