const API_URL = 'https://localhost:5000/hf';

export const API_URLS = {
  'sendMessage': { url: `${API_URL}/sendMessage`, method: 'POST' },
};

const makeRequest = async(key, options) => {
  const { params = {}, queryParams, ...rest } = options;
  const { method, url: item } = API_URLS[key];
  let url = new URL(item);
  if (queryParams) {
    url.search = new URLSearchParams(queryParams).toString();
  }
  for (const [key, value] of Object.entries(params)) {
    url.pathname = url.pathname.replace(`:${key}`, value || '');
  }
  const result = await fetch(url, {
    ...rest,
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result.json();
}

export default {
  makeRequest,
};