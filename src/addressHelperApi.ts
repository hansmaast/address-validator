import type {
  AddressHelperOptions,
  StreetCollection,
  StreetNumberCollection,
} from './types';
import { createRequestUrl } from './utils';

export const fetchAddressHelper = ({
  path,
  query,
  parameters,
}: AddressHelperOptions) => {
  const countryCode = 'NO'; // TODO: make this dynamic based on user preferences

  const url = createRequestUrl({
    countryCode,
    path,
    query,
    parameters,
  });

  const headers: HeadersInit = {
    referer: import.meta.env.VITE_APP_URL,
  };

  return fetch(url, { headers });
};

export const getStreetCollection = async (
  query: string,
): Promise<StreetCollection> => {
  const response = await fetchAddressHelper({
    path: 'streetSearch',
    query,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch street collection');
  }

  // TODO: consider doing some sort of runtime
  // validation of the response using a library like zod
  return response.json() as Promise<StreetCollection>;
};

export const getStreetNumbers = async (
  streetIds: number[],
  streetNumber: number,
): Promise<StreetNumberCollection> => {
  const response = await fetchAddressHelper({
    path: 'streetNumberSearch',
    query: streetIds.join(','),
    parameters: { streetNumber: streetNumber.toString() },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch number collection');
  }

  // TODO: consider doing some sort of runtime
  // validation of the response using a library like zod
  return response.json() as Promise<StreetNumberCollection>;
};
