const baseUrl = process.env.APP_API_URL;

export const getData = async (page) => {
  const response = await fetch(`${baseUrl}/getData`, {
    method: 'GET',
  });
  return response.json();
};
