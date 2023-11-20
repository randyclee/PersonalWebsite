import { useState } from 'react';
import Preview from './Preview'
import ImageModal from '@/components/ImageModal';
import { FiX } from 'react-icons/fi';
import { updateBlog, createBlog } from '@/services/api/blogsApi';


const CreateBlog = ({inpBlogData, onClose, isNew}) => {

  const [blogData, setBlogData] = useState({
    title: inpBlogData ? inpBlogData.title : '',
    date: inpBlogData ? inpBlogData.date : '',
    mainImage: inpBlogData ? inpBlogData.mainImage : '',
    summary: inpBlogData ? inpBlogData.summary : '',
    image: inpBlogData ? inpBlogData.image : '',
    sections: inpBlogData ? inpBlogData.sections : [],
    slug: inpBlogData ? inpBlogData.slug : '',
  });


  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [deletedImages, setDeletedImages] = useState([]); // Track deleted images
  const [newSections, setNewSections] = useState([]); // Track new sections


  const handleRemoveSection = index => {
  if (window.confirm('Are you sure you want to delete section')) {
    const section = blogData.sections[index];
    if (section && section.image && typeof section.image === 'string') {
      setDeletedImages(prev => [...prev, section.image]);
    }
    setBlogData(prevState => ({
      ...prevState,
      sections: prevState.sections.filter((_, secIndex) => secIndex !== index),
    }));
  }
};

  const handlePublish = async (blogData) => {
    if (!blogData.title || !blogData.slug || !blogData.date || !blogData.summary) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const formData = new FormData();
    
    for (const key in blogData) {
        if (blogData.hasOwnProperty(key)) {
            if (key === 'sections') {
                blogData.sections.forEach((section, index) => {
                    Object.keys(section).forEach(sectionKey => {
                        if (sectionKey === 'image' && section[sectionKey] instanceof File) {
                            formData.append(`sections[${index}][image]`, section[sectionKey]);
                        } else {
                            formData.append(`sections[${index}][${sectionKey}]`, section[sectionKey]);
                        }
                    });
                });
            } else if (key === 'mainImage' && blogData.mainImage instanceof File) {
                formData.append('mainImage', blogData.mainImage);
            } else {
                formData.append(key, blogData[key]);
            }
        }
    }

    formData.append('deletedImages', JSON.stringify(deletedImages));


    if(isNew){
      await createBlog(formData);
      onClose();
    }else{
      await updateBlog(inpBlogData._id, formData);
      onClose();
    }
    

  };
  
  
  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleShowPreview = () => {
    setShowPreviewModal(true);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSectionChange = (e, index) => {
    const { name, value } = e.target;
    setBlogData((prevState) => {
      const updatedSections = [...prevState.sections];
      updatedSections[index][name] = value;
      return {
        ...prevState,
        sections: updatedSections,
      };
    });
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogData((prevState) => ({
        ...prevState,
        mainImage: file,
      }));
    }
  };
  
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setBlogData((prevState) => {
        const updatedSections = [...prevState.sections];
        updatedSections[index].image = file;
        return {
          ...prevState,
          sections: updatedSections,
        };
      });
    }
  };
  

  const handleAddSection = () => {
    const newSection = { header: '', content: '', image: null };
    setBlogData((prevState) => ({
      ...prevState,
      sections: [...prevState.sections, newSection],
    }));
  };
  

  
  return (
<div className="modal modal-open">
      <div className="modal-box bg-white text-black border-black">
      
            <button onClick={onClose} className="btn btn-sm text-red-600 bg-white btn-circle absolute left-2 top-2">
          <FiX />
        </button>

        <h1 className="text-3xl font-bold mb-4 text-center">Create/Edit a Blog</h1>   


      <div className="mb-4">
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={blogData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md text-black border-black bg-white"
        />
      </div>

      <div className="mb-4">
          <label htmlFor="slug" className="block font-medium">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={blogData.slug}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md text-black border-black bg-white"
          />
        </div>

      <div className="mb-4">
        <label htmlFor="datetime" className="block font-medium">
          Date
        </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={blogData.date}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md text-black border-black bg-white"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="summary" className="block font-medium">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          value={blogData.summary}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md text-black border-black bg-white"
        />
      </div>

      <div className="mb-4">
      <label htmlFor="mainImage" className="block font-medium">
        Main Image
      </label>
      <input
        type="file"
        accept="image/*"
        id="mainImage"
        name="mainImage"
        onChange={handleMainImageUpload}
        className="hidden"
      />
      {blogData.mainImage && (
        <div className="mt-2">
          {blogData.mainImage instanceof File ? (
                 <img
                 src={URL.createObjectURL(blogData.mainImage)}
                 alt="Main Image Preview"
                 className="cursor-pointer rounded-md h-20 w-auto"
                 onClick={() => openImageModal(process.env.APP_URL+blogData.mainImage)}
               />
              ) :(
                <img
                src={process.env.APP_URL+blogData.mainImage}
                alt="Main Image Preview"
                className="cursor-pointer rounded-md h-20 w-auto"
                onClick={() => openImageModal(process.env.APP_URL+blogData.mainImage)}
              />
              )}
         

        </div>
      )}
        <label
          htmlFor="mainImage"
          className="btn btn-outline btn-sm mt-2"
        >
          Change Image
        </label>

      <ImageModal
        isOpen={showImageModal}
        image={selectedImage}
        onClose={() => setShowImageModal(false)}
      />
    </div>


      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">Sections</h2>

        {blogData.sections && ( blogData.sections.map((section, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <label htmlFor={`header${index}`} className="block font-medium">
                Header
              </label>
              <input
                type="text"
                id={`header${index}`}
                name="header"
                value={section.header}
                onChange={(e) => handleSectionChange(e, index)}
                className="w-full px-4 py-2 border rounded-md text-black border-black bg-white"
              />
            </div>

        


            <div className="mb-2">
              <label htmlFor={`content${index}`} className="block font-medium">
                Content
              </label>
              <textarea
                id={`content${index}`}
                name="content"
                value={section.content}
                onChange={(e) => handleSectionChange(e, index)}
                className="w-full px-4 py-2 border rounded-md text-black border-black bg-white"
              />
            </div>

            <div className="mb-2">
              <label htmlFor={`image${index}`} className="block font-medium">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                id={`image${index}`} // Make sure it's unique for each section
                name={`image${index}`} // Make sure it's unique for each section
                onChange={(e) => handleImageUpload(e, index)}
                className="hidden"
              />
            {section.image && (
              <div className="mt-2">
                {section.image instanceof File ? (
                 <img
                 src={URL.createObjectURL(section.image)}
                 alt="Main Image Preview"
                 className="cursor-pointer rounded-md h-20 w-auto"
                 onClick={() => openImageModal(process.env.APP_URL+section.image)}
               />
              ) :(
                <img
                src={process.env.APP_URL+section.image}
                alt="Main Image Preview"
                className="cursor-pointer rounded-md h-20 w-auto"
                onClick={() => openImageModal(process.env.APP_URL+section.image)}
              />
              )}
         

              </div>
              
            )}
                <label
                  htmlFor={`image${index}`}
                  className="btn btn-outline btn-sm mt-2"
                >
                  Change Image
                </label>
            </div>

            <button key={index} onClick={() => handleRemoveSection(index)} className="btn btn-error btn-xs mt-2 justify-center">
              Remove Section {index + 1}
            </button>
          </div>
        )))}
        <div className='flex justify-between mt-16'>
          <button className="btn bg-gray-800 text-white border-gray-800" onClick={handleAddSection}>Add Section</button>
          <button className="btn bg-gray-800 text-white border-gray-800" onClick={handleShowPreview}>Show Preview</button>
          <button className="btn bg-gray-800 text-white border-gray-800" onClick={() => handlePublish(blogData)}>Publish</button>
        </div>
      
     
      </div>

    </div>
        {showPreviewModal && (
        <div className="fixed inset-0 bg-white flex justify-center items-center p-4 z-50">
          <Preview blogData={blogData} onClose={() => setShowPreviewModal(false)} />
        </div>
      )}
        <ImageModal isOpen={showImageModal} image={selectedImage} onClose={() => setShowImageModal(false)} />
                
    </div>


  );
};

export default CreateBlog;