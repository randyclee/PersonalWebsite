import React, { useState, useEffect } from 'react';
import WorkCard from './WorkCard';
import WorkModal from './WorkModal';
import { fetchAllWork, deleteWork } from '@/services/api/workSectionApi';

const AppList = () => {
  const [currentWork, setCurrentWork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workExps, setworkExps] = useState([]);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    loadWork();
  }, []);

  const loadWork = async () => {
    const data = await fetchAllWork();
    setworkExps(data);
  };

  const handleEdit = (work) => {
    setCurrentWork(work);
    setIsNew(false)
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentWork(null); 
    setIsNew(true)
    setIsModalOpen(true);
  };


  const handleClose = () => {
    loadWork();
    setCurrentWork(null)
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this work history?')) {
      try {
        await deleteWork(id);
        handleClose();
      } catch (error) {
        console.error('Error deleting work history:', error);
      }
    }
  };


  return (
    <div className="flex flex-nowrap overflow-x-auto py-2 ">
      {workExps.map((work, index) => (
        <WorkCard key={index} work={work} onEdit={handleEdit} onDelete={handleDelete}/>
      ))}
     <div className="card h-60 flex-shrink-0 w-full sm:w-auto md:w-[70vw] lg:w-[50vw] xl:w-[40vw] bg-blue-200 text-black shadow-xl m-2 flex items-center justify-center cursor-pointer" onClick={handleAddNew}>
        <div className="text-3xl">+</div>
      </div>
        <WorkModal isOpen={isModalOpen} onClose={handleClose} work={currentWork} isNew = {isNew}/>
    </div>
  );
};

export default AppList;
