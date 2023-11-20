'use client'
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { fetchAllBlogs } from '@/services/api/blogsApi';

const BlogPreview = ({ post, large }) => {


  return (
    <a href={`/blogs/read/${post.slug}`} className="block p-4 card shadow-xl">
      <img
        src={`${process.env.APP_URL}${post.mainImage}`}
        alt=""
        width={800}
        height={400}
        className={`object-cover mb-2 ${large ? 'h-64 w-full' : 'h-32 w-full'}`}
      />
      <div>
        <h2 className={`text-2xl font-bold mb-2 text-center ${large ? 'text-2xl' : ''}`}>{post.title}</h2>
        <p className="text-center text-lg">{post.summary}</p>
      </div>
    </a>
  );
};


const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, [currentPage]);

  const loadData = async () => {
    const blogs = await fetchAllBlogs(currentPage);
    setBlogPosts(blogs);
  };

  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
        "@type": "ListItem",
        "position": 1,
        "item": {
            "@id": "https://www.randyclee.com/",
            "name": "Home"
        }
        },
        {
        "@type": "ListItem",
        "position": 2,
        "item": {
            "@id": "https://www.randyclee.com/blogs",
            "name": "blog home"
        }
        }
    ]
    };

  const [darkMode, setDarkMode] = useState(true); 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    paginate(nextPage);
  };
  
  const goToPreviousPage = () => {
    const previousPage = currentPage - 1;
    if (previousPage >= 1) {
      paginate(previousPage);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = sessionStorage.getItem('darkMode');
      if (savedMode !== null) {
        setDarkMode(savedMode === 'true');
      }
    }
  }, []);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Latest Blog Posts",
    "url": "https://www.randyclee.com/blogs",
    "description": "A collection of the latest blog posts I wrote.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": blogPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.randyclee.com/blogs/read/${post.slug}`,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "image": [
            {
              "@type": "ImageObject",
              "url": post.mainImage
            }
          ],
          "description": post.summary,
          "author": {
            "@type": "Person",
            "name": "Randy Lee"
          },
          "datePublished": post.datePublished,
          "dateModified": post.dateModified
        }
      }))
    }
  }
  

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header darkMode={darkMode} toggleTheme={toggleTheme}/>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-16 h-screen`}>
        <h1 className="text-4xl font-bold mb-6">Latest Blog Posts</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {blogPosts.map((post, index) => (
              <div key={index} className="w-full">
                <BlogPreview post={post} large={index === 0} />
              </div>
            ))}
          </div>

          <div className="pagination text-center mt-4">
            <button onClick={goToPreviousPage} disabled={currentPage === 1} className="page-item mr-4">←</button>
              <button>
                {currentPage}
              </button>
            <button onClick={goToNextPage} className="page-item ml-4"> →</button>
          </div>

      </div>



      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      <Footer darkMode={darkMode}/>
    </div>
  );
};

export default Main;
