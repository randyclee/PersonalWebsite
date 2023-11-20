const BlogTable = ({ blogs, onEdit, onDelete }) => {
    return (
      <table className="min-w-full text-center">
      <thead>
        <tr className="border-b">
          <th className="w-[20vw] lg:w-20 pb-3">Image</th>
          <th className="pb-3">Title</th>
          <th className="pb-3">Date</th>
          <th className="hidden lg:table-cell pb-3" style={{ width: '50%' }}>Summary</th> 
          <th className="pb-3">Actions</th>
        </tr>
      </thead>
      <tbody >
        {blogs.map((blog, index) => (
          <tr key={blog.id || index} className="align-middle border-b mt-2 py-10">
            <td className="py-2">
            {blog.mainImage instanceof File ? (
                <img
                  src={process.env.APP_URL+URL.createObjectURL(blog.mainImage)}
                  alt={blog.title}
                  className="w-20 h-20 mx-auto"
                />
              ) :(
                <img
                  src={process.env.APP_URL+blog.mainImage}
                  alt={blog.title}
                  className="w-20 h-20 mx-auto"
                />
              )}
            </td>
            <td className="py-2">{blog.title}</td>
            <td className="py-2">{new Date(blog.date).toISOString().split('T')[0]}</td>
            <td className="hidden lg:table-cell py-2">{blog.summary}</td>
            <td className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row justify-center mt-4">
              <button className="btn mx-1" onClick={() => onEdit(blog._id)}>Edit</button>
              <button className="btn mx-1" onClick={() => onDelete(blog._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    );
  };
export default BlogTable;