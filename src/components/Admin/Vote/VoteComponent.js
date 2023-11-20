import React, { useState, useEffect } from 'react';
import VoteCard from './VoteCard';
import VoteModal from './VoteModal';
import { fetchAllVotes, deleteVote } from '@/services/api/voteApi';

const VoteList = () => {
  const [currentVote, setCurrentVote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votes, setVotes] = useState([]);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    loadVotes();
  }, []);

  const loadVotes = async () => {
    const data = await fetchAllVotes();
    setVotes(data);
  };


  const handleEdit = (vote) => {
    setCurrentVote(vote);
    setIsNew(false)
    setIsModalOpen(true);
  };

  const handleDelete = async (voteId) => {
    if (window.confirm("Are you sure you want to delete this vote?")) {
      try {
        await deleteVote(voteId)
        handleClose();
      } catch (error) {
        console.error('Error deleting work history:', error);
      }
    }
  };

  const handleAddNew = () => {
    setCurrentVote(null); 
    setIsNew(true)
    setIsModalOpen(true);
  };

  const handleClose = () => {
    loadVotes();
    setCurrentVote(null)
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-nowrap overflow-x-auto py-2">
        {votes.map((vote, index)=> (
        <VoteCard key={index} vote={vote} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
     <div className="card h-60 flex-shrink-0 w-full sm:w-auto md:w-[70vw] lg:w-[50vw] xl:w-[40vw] bg-blue-200 text-black shadow-xl m-2 flex items-center justify-center cursor-pointer" onClick={handleAddNew}>
        <div className="text-3xl">+</div>
        </div>
        <VoteModal isOpen={isModalOpen} onClose={handleClose}  vote={currentVote} isNew={isNew}/>
    </div>
  );
};

export default VoteList;
