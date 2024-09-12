const API_KEY = 'f897a99d971b5eef57be6fafa0d83239';
const BASE_URL = 'https://api.openweathermap.org/geo/1.0';

async function fetchGeolocation(location: string) {
  let url = '';

  if (/^\d{5}$/.test(location)) {
    url = `${BASE_URL}/zip?zip=${location},US&appid=${API_KEY}`;
  } else {
    url = `${BASE_URL}/direct?q=${encodeURIComponent(location)},US&appid=${API_KEY}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Failed to fetch: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (Array.isArray(data) && data.length > 0) {
      const [result] = data;

      // Extract local names, fallback to result.name if no English name is found
      const localNames = result.local_names || {};
      const englishName = localNames['en'] || result.name;

      // Display location details
      console.log(`Location: ${englishName}, ${result.state || 'N/A'}`);
      console.log(`Latitude: ${result.lat}`);
      console.log(`Longitude: ${result.lon}`);
    } else if (typeof data === 'object' && data !== null) {
      // Handling zip code response
      console.log(`Location: ${data.name}, ${data.state || 'N/A'}`);
      console.log(`Latitude: ${data.lat}`);
      console.log(`Longitude: ${data.lon}`);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function main() {
  const locations = process.argv.slice(2);

  if (locations.length === 0) {
    console.log('No locations provided.');
    return;
  }

  for (const location of locations) {
    await fetchGeolocation(location);
  }
}

main().catch(console.error);