import axios from 'axios';

function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

function paramsSerializer(params: object): string {
  return Object.entries(params)
    .filter(([key, value]) => {
      const isDefined = value !== null && value !== undefined && value !== '';
      const isNonEmpty = !Array.isArray(value) || value.length > 0;


      return isDefined && isNonEmpty;
    })
    .map(([key, values]) => {
      if (!Array.isArray(values)) {
        values = [values];
      }

      return values.map((value: any) => {
        if (value instanceof Date) {
          value = value.toISOString();
        }
        else if (typeof value === 'object') {
          value = JSON.stringify(value);
        }

        return encode(key) + '=' + encode(value);
      })
        .join('&');
    })
    .join('&');
}

export const HTTP = axios.create({
  baseURL: window.autoProcessConfiguration.apiUrl,
  withCredentials: true,
  paramsSerializer
});

HTTP.interceptors.response.use((response) => {
  const token = response.headers["x-csrf-token"];
  if (token) {
    HTTP.defaults.headers.common['x-csrf-token'] = token;
  }
  return response;
});

// When the session has expired, a response with a 302 redirect will be returned from the API.
// This will fail, giving a Network Error with no response.
HTTP.interceptors.response.use(undefined, error => {
  if (!error.response) {
    alert('Din session er udløbet. Log ind i et nyt vindue og prøv igen.');
    open(`${window.autoProcessConfiguration.apiUrl}/saml/login`);
  }
});
