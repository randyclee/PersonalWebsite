import { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa';
import { fetchAllWork } from '@/services/api/workSectionApi';
import Link from 'next/link';
import Image from 'next/image';

const WorkHistory = ({ darkMode }) => {
    const [openJobIndex, setOpenJobIndex] = useState(null);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
      (async () => {
        await loadData();
      })();
    }, []);

    const loadData = async () => {
      const workData = await fetchAllWork();
      setJobs(workData);
    };
  
  
    const toggleDescription = (index) => {
      setOpenJobIndex(openJobIndex === index ? null : index);
    };
  
    return (
    <div className = {`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="py-10 px-6 sm:mx-auto sm:w-full lg:w-3/5 ">
        <h2 className="text-3xl font-bold text-center mb-12">Professional Experience</h2>
        {jobs.map((job, index) => (
          <div
            key={job.id}
            className={`"border p-8 rounded-lg shadow-xl mb-6 cursor-pointer ${darkMode ? " bg-gray-700 border-white" : ""} "`}
            onClick={() => toggleDescription(index)}
          >
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start">
              <Image src={`${process.env.APP_URL}${job.logo}`} width= {500} height={300} alt={`${job.company} Logo`} className="w-20 h-20 md:w-32 md:h-24 mb-4 md:mb-0 object-contain" />
              <div className="flex-1 lg:ml-10">
                <h3 className="font-bold text-xl mb-1">{job.title}</h3>
                <p className="text-lg  mb-1">{job.company}</p>
                <p className=" mb-4">{job.subheadings.join(' • ')}</p>
                <div className="flex justify-center md:justify-start flex-wrap gap-2 mb-4">
                  {job.tags.map((tag) => (
                    <span key={tag} className={`"${darkMode ? "text-blue-100 bg-blue-800" : "text-blue-800 bg-blue-100"} rounded-full px-3 py-1 text-sm font-medium"`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <span className="text-sm mb-2">{job.time}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleDescription(index); }}
                  className="border rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  aria-label={openJobIndex === index ? 'Collapse' : 'Expand'}
                >
                  {openJobIndex === index ? <FaMinus size={16} /> : <FaPlus size={16} />}
                </button>
              </div>
            </div>
            {openJobIndex === index && (
                <div className="pt-4 text-left">
                  <ul className="list-disc list-inside">
                    {job.description.map((desc, idx) => (
                      <li key={idx} className="text-md leading-relaxed md:mt-1 mt-2">{desc}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        ))}
    <div className="text-center mt-8">
        <Link href="/resume" className="hover:underline inline-flex items-center justify-center">
            View Full Resume <FaArrowRight className="ml-2" />
        </Link>
    </div>

      </div>
      </div>

    );
  };
  
  export default WorkHistory;