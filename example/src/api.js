const API_URL = 'https://localhost:5000/api';

export const API_URLS = {
  'models': { url: ({ provider }) => `${API_URL}/${provider}/models`, method: 'GET' },
  'sendMessage': { url: ({ provider }) => `${API_URL}/${provider}/sendMessage`, method: 'POST' },
};

const makeRequest = async(key, options) => {
  const { params = {}, queryParams, provider, ...rest } = options;
  const { method, url: getUrl } = API_URLS[key];
  let url = typeof getUrl === 'function' ? new URL(getUrl({ provider })) : new URL(getUrl);
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