import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';
import { fetchAllApps, heart } from '@/services/api/appApi';

const AppCard = ({ darkMode, app }) => {
  const [hearts, setHearts] = useState(app.hearts);
  const [liked, setLiked] = useState(false);

  const toggleLike = (addId) => {
    if(!liked){
      heart(addId)
      setLiked(true)
      setHearts(hearts + 1);   
    }
  };

  return (
    <div className={`${darkMode ? "text-white bg-gray-800" : "text-black bg-white"}`}>
      <div className={`card ${darkMode ? "text-white bg-gray-800" : "text-black bg-white"} w-full md:w-96 bg-base-100 shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl m-4`}>
        <figure><img src={`${process.env.APP_URL}${app.image}`} alt={app.title} className="object-cover h-64 w-full" /></figure>
        <div className={`card-body ${darkMode ? "text-white bg-gray-700 rounded" : "text-black bg-gray-200"}`}>
          <h2 className="card-title">{app.title}</h2>
          <p>{app.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {app.tags.map((tag, index) => (
              <span key={index} className="badge badge-outline">{tag}</span>
            ))}
          </div>
          <div className="card-actions justify-end px-3 mt-4">
            <Link href={`/explore${app.link}`} className="btn btn-primary w-30 px-10">Go</Link>
            <button onClick={() => toggleLike(app._id)} className="btn btn-ghost">
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span className="ml-1">{hearts}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const EmptyCard = ({darkMode}) => (
  <div className="card w-full md:w-96 bg-gray-500 shadow-xl m-4 relative">
    <div className="card-body flex flex-col items-center justify-center h-full">
      <h2 className={`card-title ${darkMode?"text-gray-600":"text-black"} mb-4`}>More in progress!</h2>
      <a href="/vote" className={`btn ${darkMode?"bg-gray-800 border text-white border-black hover:bg-gray-600":"bg-gray-300 text-black"}`}>
        Find out more
      </a>
    </div>
  </div>
);

const Explore = ({darkMode}) => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [apps, setApps] = useState([]);

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  const loadData = async () => {
    const projectData = await fetchAllApps();
    setApps(projectData);
  };

  const allTags = ['All', ...new Set(apps.flatMap(mockApp => mockApp.tags))];
  const filteredApps = selectedTag === 'All' ? apps : apps.filter(mockApp => mockApp.tags.includes(selectedTag));

  const explorePageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Explore Apps",
    "description": "Try out a range of interactive software applications.",
    "url": "https://www.randyclee.com/explore",
    "numberOfItems": apps.length,
    "itemListElement": apps.map((app, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": app.title,
        "description": app.description,
        "applicationCategory": "WebApplication",
        "image": app.image,
        "url": `https://www.randyclee.com/explore/${app.link}`,
      }
    }))
  };

  useEffect(() => {
    setApps(apps);
  }, []);

  return (
    <div className={`mt-16 p-10 ${darkMode?"text-white bg-gray-800":"text-black bg-white"}`}>
        <h1 className="text-4xl font-bold text-center mb-10">Try an App!</h1>

        <div className="flex flex-nowrap overflow-x-auto justify-start lg:justify-center gap-3 mb-8 scrollbar-hide">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`rounded-full px-5 py-2 text-xs font-medium badge badge-outline ${selectedTag === tag ? 'bg-blue-700 text-white' : ''} focus:outline-none whitespace-nowrap md:px-6 md:py-2 md:text-sm`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

        <div className="flex flex-wrap justify-center gap-4">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} darkMode ={darkMode} />
        ))}
        <EmptyCard darkMode = {darkMode} />
      </div>

      <div className={`${darkMode?"text-white bg-gray-800":"text-black bg-white"} flex justify-center items-center mt-10`}>
        <div className="container flex flex-col md:flex-row items-center md:my-8">
          <div className="px-8 text-center justify-center mx-auto">
            <p className="ml-2 text-yellow-800 uppercase tracking-loose">Want More?</p>
            <p className="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2">Help Pick What Comes Out Next</p>
            <p className="text-sm md:text-base mb-4">If you would like to see an idea come to life here, recommend an idea.</p>
            <a href="/vote"
              className="btn btn-outline btn-accent"
            >
              Explore Now
            </a>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(explorePageSchema) }}
      />


    
    </div>
  );
};

export default Explore;
