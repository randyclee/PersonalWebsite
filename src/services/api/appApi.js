const baseUrl = process.env.APP_API_URL;

export const fetchAllApps = async (page) => {
    const response = await fetch(`${baseUrl}/get-apps`, {
      method: 'GET',
    });
    return response.json();
};

export const fetchApp = async (id) => {
    const response = await fetch(`${baseUrl}/app/${id}`, {
        method: 'GET',
        });
    return response.json();
};

export const updateApp = async (id, blogData) => {
    const response = await fetch(`${baseUrl}/update-app/${id}`, {
        method: 'PATCH',
        body: blogData,
    });
    return response.json();
};

export const createApp = async (blogData) => {
    const response = await fetch(`${baseUrl}/create-app`, {
        method: 'POST',
        body: blogData,
    });
    return response.json();
};

export const deleteApp = async (id) => {
    const response = await fetch(`${baseUrl}/delete-app/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};
  
export const heart = async (id) => {
    const response = await fetch(`${baseUrl}/heart-app/${id}`, {
        method: 'POST',
    });
    return response.json();
};
  