import React, { useState, useEffect } from 'react';
import BlogTable from './BlogTable';
import BlogModal from './BlogModal';
import { fetchAllBlogs, fetchBlog, deleteBlog } from '@/services/api/blogsApi';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadBlogs();
  }, [currentPage]);


  const loadBlogs = async () => {
    const data = await fetchAllBlogs(currentPage);
    setBlogs(data);
  };

  const loadEditBlog = async (blogId) => {
    try {
      const blog = await fetchBlog(blogId);
      setCurrentBlog(blog);
      setIsNew(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading blog:", error);
    }
  };

  const openEditModal = (blogId) => {
    loadEditBlog(blogId);
  };


  const onDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteBlog(blogId);
        handleModalClose();
    
      } catch (error) {
        // Handle any errors that occur during the deletion process
        throw error;
      }
    }
  };

  const openCreateModal = () => {
    setCurrentBlog(null);
    setIsNew(true)
    setIsModalOpen(true);
  };


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    loadBlogs();
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

  const handleModalClose = () => {
    loadBlogs();
    setIsModalOpen(false);
    
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-12">
        <button onClick={openCreateModal} className="btn bg-gray-300 text-black hover:bg-gray-300 hover:text-black -mt-2">Create New Blog</button>
      </div>
      <BlogTable blogs={blogs} onEdit={openEditModal} onDelete = {onDelete} />

      <div className="pagination text-center mt-4">
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="page-item mr-4">←</button>
          <button>
            {currentPage}
          </button>
        <button onClick={goToNextPage} className="page-item ml-4"> →</button>
      </div>

      {isModalOpen && (
        <BlogModal inpBlogData={currentBlog} isNew={isNew} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default BlogManager;
