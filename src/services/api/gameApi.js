const baseUrl = process.env.APP_API_URL;

export const getData = async (language) => {
  const response = await fetch(`${baseUrl}/CategoryGame/getData/${language}`, {
    method: 'GET',
  });
  return response.json();
};
