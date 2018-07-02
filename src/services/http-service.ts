import axios from 'axios';

function encode(value: string) {
  return encodeURIComponent(value)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

function paramsSerializer(params: Object): string {
  return Object.entries(params)
    .filter(([key, value]) => {
      const isDefined = value !== null && value !== undefined;
      const isNonEmpty = !Array.isArray(value) || value.length > 0;

      return isDefined && isNonEmpty;
    })
    .map(([key, value]) => {
      if (!Array.isArray(value)) {
        value = [value];
      }

      return value.map((value: any) => {
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
