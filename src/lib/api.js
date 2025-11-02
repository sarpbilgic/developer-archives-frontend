const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); 
    throw new Error(errorData.detail || 'API request failed');
  }
  return response;
}


export async function searchRepositories(query, language, minStars, topics, page = 1, pageSize = 12) {
  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (language) params.append('language', language);
  if (minStars) params.append('min_stars', minStars);
  if (topics) params.append('topics', topics);
  params.append('page', page);
  params.append('page_size', pageSize);

  const response = await fetch(`${API_URL}/api/v1/search?${params.toString()}`);
  await handleResponse(response);
  return response.json(); 
}


export async function getProjectDetails(projectId) {
  if (!projectId) return null;
  const response = await fetch(`${API_URL}/api/v1/projects/${projectId}`);
  await handleResponse(response);
  return response.json(); 
}

export async function getProjectReadme(projectId) {
  if (!projectId) return null;
  const response = await fetch(`${API_URL}/api/v1/projects/${projectId}/readme`);
  await handleResponse(response);
  return response.text(); 
}