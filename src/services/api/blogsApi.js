const baseUrl = process.env.APP_API_URL;

export const fetchAllBlogs = async (page) => {
  const response = await fetch(`${baseUrl}/get-blogs?page=${page}`, {
    method: 'GET',
  });
  return response.json();
};

export const fetchBlog = async (slug) => {
    const response = await fetch(`${baseUrl}/blog/${slug}`, {
        method: 'GET',
        });
    return response.json();
};

export const updateBlog = async (id, blogData) => {

    const response = await fetch(`${baseUrl}/update-blog/${id}`, {
        method: 'PATCH',
        body: blogData,
    });
    return response.json();
};

export const createBlog = async (blogData) => {
    const response = await fetch(`${baseUrl}/create-blog`, {
        method: 'POST',
        body: blogData,
    });
    return response.json();
};

export const deleteBlog = async (id) => {
    const response = await fetch(`${baseUrl}/delete-blog/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};
