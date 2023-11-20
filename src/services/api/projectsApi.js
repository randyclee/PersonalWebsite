// src/services/api.js

const baseUrl = process.env.APP_API_URL;

export const fetchAllProjects = async () => {
  const response = await fetch(`${baseUrl}/get-projects`);
  return response.json();
};

export const fetchResumeProjects = async () => {
  const response = await fetch(`${baseUrl}/get-resume-projects`);
  return response.json();
};

export const fetchHighlightProjects = async () => {
  const response = await fetch(`${baseUrl}/get-highlight-projects`);
  return response.json();
};

export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${baseUrl}/create-project`, {
      method: 'POST',
      body: projectData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in createProject:", error);
    throw error; 
  }
};

export const updateProject = async (id, projectData) => {
    const response = await fetch(`${baseUrl}/update-project/${id}`, {
      method: 'POST',
      body: projectData,
    });
    return response.json();
  };
  
  export const deleteProject = async (id) => {
    await fetch(`${baseUrl}/delete-project/${id}`, {
      method: 'DELETE',
    });
  };

  export const deleteImage = async (imageId) => {
    await fetch(`${baseUrl}/delete-project-image/${imageId}`, {
      method: 'DELETE',
    });
  };