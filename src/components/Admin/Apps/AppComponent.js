import React, { useState, useEffect } from 'react';
import AppCard from './AppCard';
import AppModal from './AppModal';
import { fetchAllApps, deleteApp } from '@/services/api/appApi';

const AppList = () => {
  const [currentApp, setCurrentApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apps, setApps] = useState([]);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    const data = await fetchAllApps();
    setApps(data);
  };

  const handleEdit = (app) => {
    setCurrentApp(app);
    setIsNew(false)
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentApp(null); 
    setIsNew(true)
    setIsModalOpen(true);
  };


  const handleDelete = async (updatedApp) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteApp(updatedApp)
        handleClose();
      } catch (error) {
        console.error('Error deleting work history:', error);
      }
    }
  };

  const handleClose = () => {
    loadApps();
    setCurrentApp(null)
    setIsModalOpen(false);
  };


  return (
    <div className="flex flex-nowrap overflow-x-auto py-2 ">
      {apps.map((app, index) => (
        <AppCard key={index} app={app} onEdit={handleEdit} onDelete={handleDelete}/>
      ))}
     <div className="card h-60 flex-shrink-0 w-full sm:w-auto md:w-[70vw] lg:w-[50vw] xl:w-[40vw] bg-blue-200 text-black shadow-xl m-2 flex items-center justify-center cursor-pointer" onClick={handleAddNew}>
        <div className="text-3xl">+</div>
      </div>
        <AppModal isOpen={isModalOpen} onClose={handleClose}  app={currentApp} isNew={isNew}/>
    </div>
  );
};

export default AppList;
