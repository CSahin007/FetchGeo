import { test, expect } from '@playwright/test';

test.describe('Geolocation Utility', () => {
  const apiKey = 'f897a99d971b5eef57be6fafa0d83239';

  test('Fetch data for city/state with expected results', async ({ request }) => {
    const city = 'Madison,WI,US';
    const response = await request.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    // Assert response structure
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
    const result = responseBody[0];
    expect(result.name).toBe('Madison');
    expect(result.lat).toBeCloseTo(43.07, 1);
    expect(result.lon).toBeCloseTo(-89.38, 1);
    expect(result.state).toBe('Wisconsin');
  });

  test('Fetch data for zip code with expected results', async ({ request }) => {
    const zipCode = '12345';
    const response = await request.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    // Assert response structure
    expect(typeof responseBody).toBe('object');
    expect(responseBody.name).toBe('Schenectady');
    expect(responseBody.lat).toBeCloseTo(42.81, 1);
    expect(responseBody.lon).toBeCloseTo(-73.94, 1);
    expect(responseBody.state).toBe('New York');
  });

  test('Fetch data for invalid city/state', async ({ request }) => {
    const invalidCity = 'InvalidCity,XX,US';
    const response = await request.get(`http://api.openweathermap.org/geo/1.0/direct?q=${invalidCity}&limit=1&appid=${apiKey}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    // Assert response structure for invalid city
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBe(0); // Expecting an empty result
  });

  test('Fetch data for invalid zip code', async ({ request }) => {
    const invalidZipCode = '99999';
    const response = await request.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${invalidZipCode},US&appid=${apiKey}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    // Assert response structure for invalid zip code
    expect(typeof responseBody).toBe('object');
    expect(responseBody).toEqual({}); // Expecting an empty object
  });

  test('Fetch data for city/state without state', async ({ request }) => {
    const cityWithoutState = 'New York,US';
    const response = await request.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityWithoutState}&limit=1&appid=${apiKey}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    // Assert response structure
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
    const result = responseBody[0];
    expect(result.name).toBe('New York');
    expect(result.state).toBeUndefined(); // State may not be included in some cases
  });
});