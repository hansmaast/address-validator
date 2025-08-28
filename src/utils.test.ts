import { describe, expect, test } from 'vitest';
import type { RequestOptions } from './types';
import {
  createRequestUrl,
  extractStreetName,
  extractStreetNumber,
} from './utils';

describe('create request url', () => {
  const testOptions: RequestOptions = {
    countryCode: 'NO',
    baseUrl: 'http://example.com',
    path: 'path',
    query: 'query',
    parameters: { key: 'value' },
    apiKey: '123',
  };

  test('should create url with correct structure', () => {
    const url = createRequestUrl(testOptions);

    expect(url.toString()).toBe(
      'http://example.com/NO/path/query?apiKey=123&key=value',
    );
  });

  test('should encode special characters (æåø) in query', () => {
    const url = createRequestUrl({
      ...testOptions,
      parameters: { key: 'value', special: 'æåø' },
    });

    expect(url.toString()).toBe(
      'http://example.com/NO/path/query?apiKey=123&key=value&special=%C3%A6%C3%A5%C3%B8',
    );
  });

  test('should throw error if baseUrl is missing', () => {
    expect(() => createRequestUrl({ ...testOptions, baseUrl: '' })).toThrow(
      'Base URL is required',
    );
  });

  test('should throw error if apiKey is missing', () => {
    expect(() => createRequestUrl({ ...testOptions, apiKey: '' })).toThrow(
      'API key is required',
    );
  });
});

describe('string address extraction utils', () => {
  test('should extract street name', () => {
    const streetName = extractStreetName('Westye Egebergs gate 7c');
    expect(streetName).toBe('Westye Egebergs gate');
  });

  test('should extract number with optional letter', () => {
    const streetNumber = extractStreetNumber('Westye Egebergs gate 7c');
    expect(streetNumber?.number).toBe(7);
    expect(streetNumber?.entrance).toBe('c');
  });
});
