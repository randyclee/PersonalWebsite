//Need to refactor Preview to use blog compoenent

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Preview = ({blogData, onClose}) => {

  return (
    <div style={{ zIndex: 50 }} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl overflow-auto">

      <div className="max-w-5xl mx-auto px-6 py-4 mt-16">
        <Link href="/blogs/home">
          <button className="text-blue-500 hover:underline mb-4">&lt; Blog Home</button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">{blogData.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{blogData.summary}</p>
        <div className="flex items-center mb-6">
          <Image src={blogData.author.image} alt="author" width={800} height={400} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="text-sm text-gray-600">{blogData.date}</p>
            <p className="text-lg font-semibold">{blogData.author.name}</p>
          </div>
        </div>

        <Image src={blogData.mainImage} alt="" width={800} height={400} className="w-full h-64 object-cover mb-4 rounded-lg" />

        {blogData.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{section.header}</h2>
            <p className="mb-2">{section.content}</p>
            {section.image && (
              <Image src={section.image} alt="" width={800} height={400} className="w-3/4 mx-auto h-64 object-cover mb-2 rounded-lg" />
            )}
          </div>
        ))}
        
        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={onClose}>Close Preview</button>
        </div>
      </div>

    </div>
  );
};

export default Preview;
