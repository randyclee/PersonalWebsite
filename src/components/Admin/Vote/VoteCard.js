import React from 'react';

const VoteCard = ({ vote, onEdit, onDelete }) => (
<div className="card flex-shrink-0 w-full sm:w-auto md:w-[70vw] lg:w-[50vw] xl:w-[40vw] bg-gray-200 text-black shadow-xl m-2">
    <div className="card-body text-center">
      <h2 className="card-title justify-center text-center mb-2">{vote.name}</h2>
      <img src={`${process.env.APP_URL}${vote.imageUrl}`} alt={vote.name} className="mx-auto h-40 w-auto" />
      <p className="mt-2">Votes: {vote.votes}</p>
      <p className="mt-2">{vote.businessUseCase}</p>
      <div className="card-actions justify-center mt-4">
        <button className="btn btn-primary btn-sm" onClick={() => onEdit(vote)}>
          Edit
        </button>
        <button className="btn btn-error btn-sm" onClick={() => onDelete(vote._id)}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default VoteCard;
