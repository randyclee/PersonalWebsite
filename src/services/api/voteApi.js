const baseUrl = process.env.APP_API_URL;

export const fetchAllVotes = async (page) => {
    const response = await fetch(`${baseUrl}/get-votes`, {
      method: 'GET',
    });
    return response.json();
  };
  
  export const fetchVote = async (id) => {
      const response = await fetch(`${baseUrl}/vote/${id}`, {
          method: 'GET',
          });
      return response.json();
  };
  
  export const updateVote = async (id, blogData) => {
  
      const response = await fetch(`${baseUrl}/update-vote/${id}`, {
          method: 'PATCH',
          body: blogData,
      });
      return response.json();
  };
  
  export const createVote = async (blogData) => {
      const response = await fetch(`${baseUrl}/create-vote`, {
          method: 'POST',
          body: blogData,
      });
      return response.json();
  };
  
  export const deleteVote = async (id) => {
      const response = await fetch(`${baseUrl}/delete-vote/${id}`, {
          method: 'DELETE',
      });
      return response.json();
  };
  export const vote = async (id) => {
    const response = await fetch(`${baseUrl}/vote-project/${id}`, {
        method: 'POST',
    });
    return response.json();
};

  