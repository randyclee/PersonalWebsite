import { FaPython, FaJsSquare, FaDatabase, FaAws, FaJenkins } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTensorflow } from 'react-icons/si';
import { IoMdConstruct } from 'react-icons/io';

export default function AboutMe({ darkMode }) {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Me",
    "description": "Learn more about Randy, a software engineer based in Toronto, Onatrio."
  }

  return (
    
    <div className={`duration-300 h-auto 
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}
    `}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <div className="container mx-auto px-9 md:px-4  py-14 ">
        <h2 className="text-3xl font-semibold text-center mb-6">
          About Me
        </h2>
        <p className="text-lg leading-relaxed">
          I started my coding journey as part of the robotics team in high school. This led me to study Computer Engineering, where I also got myself a Certificate in Business.
          I love building, designing and implementing things, while also solving their business applications. Here are some of my favorite tech stacks and interests:
        </p>

        {/* Tech stack and interests section */}
        <div className="grid grid-cols-3 gap-10 mt-10 mb-10">
          {/* Python */}
          <div className="flex flex-col items-center">
            <FaPython size={50} />
            <span className="mt-2 text-lg">Python</span>
          </div>

          {/* JavaScript */}
          <div className="flex flex-col items-center">
            <FaJsSquare size={50} />
            <span className="mt-2 text-lg">JavaScript</span>
          </div>

          {/* Next.js */}
          <div className="flex flex-col items-center">
            <SiNextdotjs size={50} />
            <span className="mt-2 text-lg">Next.js</span>
          </div>

          {/* TailwindCSS */}
          <div className="flex flex-col items-center">
            <SiTailwindcss size={50} />
            <span className="mt-2 text-lg">TailwindCSS</span>
          </div>

          {/* Databases */}
          <div className="flex flex-col items-center">
            <FaDatabase size={50} />
            <span className="mt-2 text-lg">Databases</span>
          </div>

          {/* AI */}
          <div className="flex flex-col items-center">
            <SiTensorflow size={50} />
            <span className="mt-2 text-lg ">AI</span>
          </div>

        </div>

        <p className="text-lg leading-relaxed">
          Aside from computers, I am a big fan of basketball, stocks, hanging with friends, and cooking new dishes.
        </p>
      </div>
    </div>
  );
}
