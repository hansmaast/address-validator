import type { RequestOptions } from './types';

export const createRequestUrl = ({
  baseUrl = import.meta.env.VITE_API_URL,
  apiKey = import.meta.env.VITE_API_KEY,
  ...options
}: RequestOptions): URL => {
  if (!baseUrl) throw new Error('Base URL is required');
  if (!apiKey) throw new Error('API key is required');

  const { countryCode, path, query, parameters } = options;

  // creates a uri encoded url (supports æåø)
  const url = new URL(`${baseUrl}/${countryCode}/${path}/${query}`);
  url.searchParams.append('apiKey', apiKey);

  if (parameters) {
    Object.entries(parameters).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  return url;
};

export const extractStreetName = (address: string) => {
  // Matches any character except newline up until the first digit
  const match = address.match(/(.+?)\s+\d+/);
  console.log(match);
  if (!match) return null;
  return match[1].trim();
};

export const extractStreetNumber = (address: string) => {
  // Matches one or more digits followed by an optional letter
  const match = address.match(/(\d+)([a-zA-Z]?)$/);
  if (!match) return null;
  return {
    number: parseInt(match[1], 10),
    entrance: match[2] || null,
  };
};
