import React from 'react';

const WorkCard = ({ work, onEdit, onDelete }) => (
  <div className="card flex-shrink-0 w-full sm:w-auto md:w-[70vw] lg:w-[50vw] xl:w-[40vw] bg-gray-200 text-black shadow-xl m-2">
    <div className="card-body text-center">
      <h2 className="card-title justify-center text-center mb-2">{work.title}</h2>
      <img src={`${process.env.APP_URL}${work.logo}`} alt={work.title} className="mx-auto h-40 w-auto rounded" />
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {work.tags.map((tag, index) => (
          <span key={index} className="bg-blue-200 text-blue-800 py-1 px-3 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="card-actions justify-center mt-4">
        <button className="btn btn-primary btn-sm" onClick={() => onEdit(work)}>
          Edit
        </button>
        <button className="btn btn-error btn-sm" onClick={() => onDelete(work._id)}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default WorkCard;
