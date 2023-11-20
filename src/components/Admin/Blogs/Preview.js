const Preview = ({ blogData, onClose }) => {
    return (
      <div className="overflow-auto max-h-[80vh] p-4 text-black bg-white">
        <h1 className="text-3xl font-bold mb-2">{blogData.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{blogData.summary}</p>
  
        {/* Display author info, if available */}
          <div className="flex items-center mb-6">
            <img src="/uploads/randy.jpg" alt="author" className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p className="text-sm text-gray-600">2023-01-01</p>
              <p className="text-lg font-semibold">Randy Lee</p>
            </div>
          </div>
  
        {/* Main image */}
        <img src={`${process.env.APP_URL}${blogData.mainImage}`} alt="" className="w-full h-64 object-cover mb-4 rounded-lg" />
  
        {/* Sections */}
        {blogData.sections && ( blogData.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{section.header}</h2>
            <p className="mb-2">{section.content}</p>
            {section.image && (
              <img src={`${process.env.APP_URL}${section.image}`} alt="" className="mx-auto h-64 object-cover mb-2 rounded-lg" />
            )}
          </div>
        )))}
        
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={onClose}>
            Close Preview
          </button>
        </div>
      </div>
    );
  };
  
  export default Preview;
  