const baseUrl = process.env.APP_API_URL;


export const fetchAllWork = async () => {
    const response = await fetch(`${baseUrl}/get-work-history`);
    return response.json();
};

export const fetchResumeWork = async () => {
  const response = await fetch(`${baseUrl}/get-work-history-resume`);
  return response.json();
};

export const createWork = async (workData) => {
  try {
    const response = await fetch(`${baseUrl}/create-work-history`, {
      method: 'POST',
      body: workData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};

export const updateWork = async (id, workData) => {

  const response = await fetch(`${baseUrl}/update-work-history/${id}`, {
    method: 'PATCH',
    body: workData,
  });

  return response.json();
};


export const deleteWork = async (id) => {
  await fetch(`${baseUrl}/delete-work-history/${id}`, {
    method: 'DELETE',
  });
};