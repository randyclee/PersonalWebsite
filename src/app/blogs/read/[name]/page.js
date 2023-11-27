'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { fetchBlog } from '@/services/api/blogsApi';
import Head from 'next/head'; 
import ImageModal from '@/components/ImageModal'; // Import the ImageModal component


const Home = ({params}) => {
  const [blogData, setBlogData] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  const loadData = async () => {
    const blog = await fetchBlog(params.name);
    if (!blog || !blog.author) {
      router.push('/404'); 
      return;
    }
    setBlogData(blog);
  };

  console.log(blogData)

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.randyclee.com/blogs/${blogData?.slug}`
    },
    "headline": blogData?.title,
    "image": blogData?.mainImage, 
    "author": {
      "@type": "Person",
      "name": "Randy",
      "image": {
        "@type": "ImageObject",
      }
    },
    "publisher": {
      "@type": "Person", 
      "name": "Randy Lee",
      "image": blogData?.author.image
    },
    "datePublished": blogData?.datePublished,
    "dateModified": blogData?.dateModified,
    "description": blogData?.summary,
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
            "@id": `https://www.randyclee.com/blogs/${blogData?.slug}`,
            "name": `${blogData?.slug}`
        }
        }
    ]
    };
  

  const [darkMode, setDarkMode] = useState(true); 

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

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const closeImageModal = (e) => {
    e.stopPropagation();
    setIsImageModalOpen(false);
  };



  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      <Header darkMode={darkMode} toggleTheme={toggleTheme}/>
      <div className={`max-w-5xl mx-auto px-6 mt-16`}>
      <div className="max-w-5xl mx-auto px-6 py-4 mt-16">
        <Link href="/blogs">
          <button className="text-blue-500 hover:underline mb-4">&lt; Blog Home</button>
        </Link>
        <h1 className="text-4xl font-bold mb-2 text-center">{blogData?.title}</h1>
        <p className="text-2xl mb-4">{blogData?.summary}</p>
        <div className="flex items-center mb-6">
          <img src={blogData?.author.image} alt="author" width={800} height={400} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="text-sm">{new Date(blogData?.date).toLocaleDateString()}</p>
            <p className="text-lg font-semibold">{blogData?.author.name}</p>
          </div>
        </div>

        <img src={`${process.env.APP_URL}${blogData?.mainImage}`}  href="#" onClick={() => openImageModal(blogData?.mainImage)} alt="" width={800} height={400} className="w-full h-64 object-cover mb-4 rounded-lg" />

        {blogData?.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{section.header}</h2>
            <p className="mb-2">{section.content}</p>
            {section.image && (
              <img src={`${process.env.APP_URL}${section.image}`} href="#" onClick={() => openImageModal(section.image)}  alt="" width={800} height={400} className="w-3/4 mx-auto h-64 object-cover mb-2 rounded-lg" />
            )}
          </div>
        ))}
      </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {isImageModalOpen && (
        <ImageModal
          image={selectedImage}
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
        />
      )}
      <Footer darkMode={darkMode}/>
    </div>
  );
};

export default Home;

