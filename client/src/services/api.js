import axios from 'axios';

const BASE_CANDIDATES = [
  import.meta.env.VITE_API_URL,
  'http://localhost:5000/api',
  'http://localhost:5001/api',
  'http://localhost:5002/api',
  'http://localhost:5003/api'
].filter(Boolean);

async function requestWithFallback(method, path, data) {
  let lastError = null;

  for (const baseUrl of BASE_CANDIDATES) {
    try {
      const response = await axios({
        method,
        url: `${baseUrl}${path}`,
        data,
        timeout: 3000
      });
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Unable to reach Borrower Copilot API');
}

export async function fetchPresets() {
  return requestWithFallback('get', '/presets');
}

export async function evaluateProfile(profile) {
  return requestWithFallback('post', '/evaluate', profile);
}
